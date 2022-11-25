import axios from "axios";

export const login = (email) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(
        `https://big-pandas-smash-103-95-41-46.loca.lt/users?email=${email}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsername = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(
        `https://big-pandas-smash-103-95-41-46.loca.lt/users?token=${token}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProducts = (page, search = "") => {
  let params = "";
  if (search !== "") {
    params = `product_name=${search}&_page=${page}&_limit=10&_sort=product_name&_order=asc`;
  } else {
    params = `_page=${page}&_limit=10&_sort=product_name&_order=asc`;
  }

  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(
        `https://forty-boxes-grow-103-95-41-46.loca.lt/products?${params}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
