import SunIcon from "../assets/sun.svg";
import { useAppSelector } from "../store/hooks";

const formatDate = (date: number | string): string => {
  return new Date(Number(date) * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CurrentWeather = () => {
  const { weather } = useAppSelector((state) => state.weather);
  const time = weather ? formatDate(weather.dt) : "";

  return (
    <div className=" bg-card text-text p-6 w-full flex flex-col rounded-card lg:w-100 shadow-card">
      <div className="flex lg:justify-between items-center gap-4">
        <div className="">
          <h2 className="text-9xl md:text-8xl text-primary">
            {Math.round(weather?.main?.temp)}°
          </h2>

          <p className="text-3xl md:text-[40px] mt-2 ">Сегодня</p>
        </div>
        <img
          src={SunIcon}
          className=" w-24 h-24 md:w-29.75 md:h-29.75 ml-2"
          alt=""
        />
      </div>

      <p className="mt-4 text-xl md:text-2xl text-secondary">Время: {time}</p>

      <p className="mt-1 text-xl md:text-2xl text-secondary">
        Город: {weather?.name}
      </p>
    </div>
  );
};

export default CurrentWeather;
