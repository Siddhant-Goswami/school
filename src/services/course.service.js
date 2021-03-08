import axios from "axios";
import { MOCKY_BASE_URL } from "../constants/api.constants";

let api = axios.create({
  baseURL: MOCKY_BASE_URL,
});

export const fetchCourseListing = (hash) => {
    if(hash) {
        return api.get(`?card_hash${hash}`)
    }
   return api.get();
};
