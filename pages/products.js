import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  CircularProgress,
  Paper,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { getProducts, getUsername } from "../src/api/api";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../src/store/products";

const cookies = new Cookies();

export default function ProductsPage() {
  const router = useRouter();
  const [username, setUserName] = useState("");

  const rows = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  dispatch(setProducts());

  const doGetUsername = (token) => {
    getUsername(token)
      .then((res) => {
        if (res.data) {
          console.log();
          setUserName(`${res.data[0].first_name} ${res.data[0].last_name}`);
        }
      })
      .catch(() => {
        setUserName("User");
      });
  };

  const doGetProducts = (page = 1, search = "") => {
    getProducts(page, search)
      .then((res) => {
        if (res.data) {
          dispatch(setProducts(res.data));
        }
      })
      .catch(() => {
        dispatch(setProducts([]));
      });
  };

  const doLogout = () => {
    cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (token === undefined || token === null) {
      router.push("/");
    } else {
      rows === undefined && doGetProducts();
      username === "" && doGetUsername(token);
    }
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {username}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                doLogout();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack spacing={2}>
        {rows !== undefined ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.product_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.product_name}
                    </TableCell>
                    <TableCell>{row.image}</TableCell>
                    <TableCell>
                      <Link>View</Link>
                      <Link>Edit</Link>
                      <Link>Delete</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </>
  );
}
