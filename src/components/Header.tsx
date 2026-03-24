import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { HeaderLogo, ToggleIcon } from "../assets";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchWeeklyWeather } from "../store/slices/forecastSlice";
import { fetchCurrentWeather, setCity } from "../store/slices/weatherSlice";

const cities = [
  "Ташкент",
  "Самарканд",
  "Бухара",
  "Хива",
  "Нукус",
  "Карши",
  "Термез",
  "Навои",
  "Андижан",
  "Наманган",
  "Фергана",
  "Гулистан",
  "Джизак",
  "Ургенч",
] as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.weather.city);

  useEffect(() => {
    dispatch(fetchCurrentWeather(selectedCity));
    dispatch(fetchWeeklyWeather(selectedCity));
  }, [selectedCity, dispatch]);

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative z-50">
      <div className="flex items-center gap-3">
        <img src={HeaderLogo} className="w-12 h-12 sm:w-16 sm:h-16" alt="" />
        <h1 className="text-primary text-lg sm:text-2xl font-bold font-sans uppercase">
          React Weather
        </h1>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button onClick={toggleDark} title="Close menu">
          <img src={ToggleIcon} alt="" className="w-8 h-8" />
        </button>

        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full  bg-soft text-text rounded-md px-4 py-2 flex justify-between items-center"
          >
            {selectedCity || "Выбрать город"}
            <span className="font-extrabold text-3xl ">
              {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </span>
          </button>

          <ul
            className={`absolute top-full left-0 w-full bg-soft text-text rounded-md mt-2 shadow-lg z-50 max-h-64 overflow-y-auto transition-opacity duration-300 ${isOpen ? "visible pointer-events-auto opacity-100" : "opacity-0 invisible pointer-events-none"}`}
          >
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  dispatch(setCity(city));
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-base hover:bg-hover cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
