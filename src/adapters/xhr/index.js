import axios, { Axios } from "axios";

function returnAxiosInstance() {
  return Axios.create(initializers);
}

export function get(url) {
  const axios = returnAxiosInstance();

  axios.get(url);
}
