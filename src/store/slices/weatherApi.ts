import { axiosApi } from "../../api";
import type { RootForecast } from "../types/forecastType";
import type { RootWeather } from "../types/weatherType";

export const getCurrentWeather = async (
  city: string,
): Promise<RootWeather> => {
  const response = await axiosApi.get<RootWeather>(`/weather`, {
    params: {
      q: city,
    },
  });

  return response.data;
};

export const getWeeklyWeather = async (
  city: string,
): Promise<RootForecast> => {
  const response = await axiosApi.get<RootForecast>(`/forecast`, {
    params: {
      q: city,
    },
  });

  return response.data;
};
