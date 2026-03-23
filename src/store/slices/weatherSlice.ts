import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RootWeather } from '../types/weatherType';
import { getCurrentWeather } from "./weatherApi";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const res = await getCurrentWeather(city);
      return res;
    } catch (error: unknown) {
      const customError = error as AxiosError<{
        message: string
      }>
      return rejectWithValue(
        customError.response?.data?.message ||
          customError.message ||
          "Something went wrong",
      );
    }
  },
);

interface WeatherState {
  weather:  RootWeather;
  loading: boolean;
  error: null | string;
  city: string;
}

const initialState: WeatherState = {
  weather: {} as RootWeather,
  loading: false,
  error: null,
  city: "Ташкент",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
