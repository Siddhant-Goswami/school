import axios from "axios";
import { API_BASE_URL, COLLEGE_LIST } from "../constants/api.constants";

let api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCollegeListing = (queryString) => {
  if (queryString) return api.get(`${COLLEGE_LIST}?q=${queryString}`);

  return api.get(COLLEGE_LIST);
};
