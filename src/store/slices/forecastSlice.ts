import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RootForecast } from "../types/forecastType";
import { getWeeklyWeather } from "./weatherApi";

export const fetchWeeklyWeather = createAsyncThunk(
  "forecast/fetchWeeklyWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const res = await getWeeklyWeather(city);
      return res;
    } catch (error: unknown) {
      const customError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        customError.response?.data?.message ||
          customError.message ||
          "Something went wrong",
      );
    }
  },
);

interface ForecastState {
  forecast: RootForecast;
  loadingForecast: boolean;
  errorForecast: null | string;
}

const initialState: ForecastState = {
  forecast: {} as RootForecast,
  loadingForecast: false,
  errorForecast: null,
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchWeeklyWeather.pending, (state) => {
        state.loadingForecast = true;
        state.errorForecast = null;
      })
      .addCase(fetchWeeklyWeather.fulfilled, (state, action) => {
        state.loadingForecast = false;
        state.forecast = action.payload;
      })
      .addCase(fetchWeeklyWeather.rejected, (state, action) => {
        state.loadingForecast =false;
        state.errorForecast = action.payload as string;
      });
  },
});

export default forecastSlice.reducer;
