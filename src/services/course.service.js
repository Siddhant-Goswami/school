import axios from "axios";
import {
  COURSE_DETAILS,
  CARD_DETAILS,
  MOCKY_BASE_URL,
} from "../constants/api.constants";

let api = axios.create({
  baseURL: MOCKY_BASE_URL,
});

export const fetchCourseListing = (hash) => {
  if (hash) {
    return api.get(`${COURSE_DETAILS}?card_hash${hash}`);
  }
  return api.get(`${COURSE_DETAILS}`);
};

export const fetchCourseCardDetails = (hash) => {
  if (hash) {
    return api.get(`${CARD_DETAILS}?card_hash${hash}`);
  }
  return api.get(`${CARD_DETAILS}`);
};
