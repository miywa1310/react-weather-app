import axios from "axios";

const API_KEY: string = "0e96e50efa40cd14ebf5dafc9d06bea4";
const BASE_URL: string = "https://api.openweathermap.org/data/2.5";
export const axiosApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ru",
  },
});
