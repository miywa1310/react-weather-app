import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  CurrentWeather,
  ForecastList,
  Header,
  WeatherDetails,
} from "./components";
import "./index.css";
import { useAppSelector } from "./store/hooks";

function App() {
  const { loading, error } = useAppSelector((state) => state.weather);
  const { loadingForecast, errorForecast } = useAppSelector(
    (state) => state.forecast,
  );
  return (
    <section className="min-h-screen bg-background text-text font-sans">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-5 container">
        <div className="relative z-50">
          <Header />
        </div>

        {loading && loadingForecast && (
          <div className="text-xl flex justify-center items-center gap-3 my-4 text-secondary">
            <p>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </p>
            <p className="animate-pulse">Загрузка...</p>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
        {errorForecast && (
          <p className="text-red-500 text-center">{errorForecast}</p>
        )}

        {!loading && !loadingForecast && !errorForecast && !error && (
          <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mt-8">
              <CurrentWeather />
              <WeatherDetails />
            </div>

            <div className="py-10">
              <ForecastList />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default App;
