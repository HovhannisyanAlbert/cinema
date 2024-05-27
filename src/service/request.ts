import axios from "axios";
import { baseURL } from "../configHTTP";

const request = axios.create({
  baseURL: baseURL,
});
export default request;
