import axios from "axios";
import { API_BASE_URL, COLLEGE_LIST } from "../constants/api.constants";

let api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCollegeListing = (queryString, perPage, offset) => {
  return api.get(
    `${COLLEGE_LIST}?q=${queryString}&limit=${perPage}&offset=${offset}`
  );
};
