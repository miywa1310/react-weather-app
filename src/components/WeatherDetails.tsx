import pressureIcon from "../assets/Humidity.svg";
import precipitationIcon from "../assets/Precipitation.svg";
import Thermometr from "../assets/Thermometr.svg";
import windIcon from "../assets/Wind.svg";
import { useAppSelector } from "../store/hooks";

interface DetailItem {
  icon: string;
  title: string;
  description: string;
}

const WeatherDetails = () => {
  const { weather } = useAppSelector((state) => state.weather);

  const detailData: DetailItem[] = [
    {
      icon: Thermometr,
      title: "Температура",
      description: `${weather?.main?.temp}° — ощущается как ${weather?.main?.feels_like?.toFixed(1)}°`,
    },
    {
      icon: pressureIcon,
      title: "Давление",
      description: `${weather?.main?.pressure} мм ртутного столба - нормальное°`,
    },
    {
      icon: precipitationIcon,
      title: "Осадки",
      description: `${weather?.rain?.["1h"] ? `${weather?.rain["1h"]} мм` : "Без осадков"}`,
    },
    {
      icon: windIcon,
      title: "Ветер",
      description: `${weather?.wind?.speed} м/с юго-запад - легкий ветер`,
    },
  ];
  return (
    <div className="bg-card p-8 rounded-card w-full lg:w-187.5 shadow-card ">
      <div className="flex flex-col gap-4">
        {detailData.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[60px_200px_1fr] items-center gap-2 md:gap-0"
            >
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow">
                <img src={item.icon} alt="" />
              </div>

              <span className="text-secondary text-sm">{item.title}</span>

              <span className="text-text text-sm">{item.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;
