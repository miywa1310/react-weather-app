import { Cloudy, Rain, RainnySun, SmallRain, Snow, Sun } from "../assets";
import type { List } from "../store/types/forecastType";

interface ForecastCardProps {
  item: List;
  dayName: string;
}

const iconMapping: Record<string, string> = {
  "небольшой дождь": SmallRain,
  дождь: Rain,
  ясно: Sun,
  солнце: RainnySun,
  пасмурно: Cloudy,
  облачно: Cloudy,
  "небольшой снег": Snow,
  снег: Snow,
  "небольшая облачность": Cloudy,
  "облачно с прояснениями": Cloudy,
  "переменная облачность": Cloudy,
};

const ForecastCard: React.FC<ForecastCardProps> = ({ item, dayName }) => {
  const date = new Date(item.dt * 1000);
  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "short" });
  const description = item.weather[0].description;
  const descriptionCapitalized = description.replace(/^./, (c) =>
    c.toUpperCase(),
  );

  const iconSrc = iconMapping[description];

  return (
    <div className="min-w-37.25 h-58.75 bg-soft text-text rounded-xl px-4 py-2 flex flex-col gap-2 shadow-card">
      <p className="text-lg">{dayName}</p>
      <p className="text-sm text-secondary">
        {day} {month}
      </p>
      <img src={iconSrc} alt="" className="w-12 h-12 object-contain" />
      <div className="">
        <p className="text-lg">{Math.round(item.main.temp_max)}°</p>
        <p className="text-sm text-secondary">
          {Math.round(item.main.feels_like)}°
        </p>
      </div>
      <p className="text-sm text-secondary ">{descriptionCapitalized}</p>
    </div>
  );
};

export default ForecastCard;
