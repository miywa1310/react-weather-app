import { useMemo, useState } from "react";
import { useAppSelector } from "../store/hooks";
import type { List } from "../store/types/forecastType";
import ForecastCard from "./ForecastCard";

const getForecastItems = (dailyForecast: List[], activeBtn: TabKey): List[] => {
  if (!dailyForecast) return [];
  switch (activeBtn) {
    case "weekly":
      return [...dailyForecast, dailyForecast[0], dailyForecast[1]];
    case "10days":
      return [...dailyForecast, ...dailyForecast];
    case "monthly":
      return Array(6).fill(dailyForecast).flat();
    default:
      return dailyForecast;
  }
};

type TabKey = "weekly" | "monthly" | "10days";

interface Tab {
  key: TabKey;
  text: string;
}

const tabs: Tab[] = [
  {
    key: "weekly",
    text: "На неделю",
  },
  {
    key: "monthly",
    text: "На месяц",
  },
  {
    key: "10days",
    text: "На 10 дней",
  },
];

const ForecastList = () => {
  const { forecast } = useAppSelector((state) => state.forecast);
  const [activeBtn, setActiveBtn] = useState<TabKey>("weekly");
  const dailyForecast: List[] = useMemo(() => {
    return forecast?.list?.filter((item) => item.dt_txt.includes("12:00:00"));
  }, [forecast?.list]);

  function day(item: List): string {
    return new Date(
      (item.dt + forecast.city.timezone) * 1000,
    ).toLocaleDateString("ru-RU", { weekday: "short" });
  }

  const forecastItems = getForecastItems(dailyForecast, activeBtn);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-wrap  gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveBtn(tab.key)}
              className={`text-text px-6 py-1 text-sm md:text-lg w-full sm:w-auto sm:flex items-center rounded-md shadow-card
                            ${activeBtn === tab.key ? "bg-primary text-white" : "bg-card"}
                            `}
            >
              {tab.text}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => setActiveBtn("weekly")}
            className="w-full px-6 py-1 text-sm md:text-lg rounded-md bg-card shadow-card"
          >
            Отменить
          </button>
        </div>
      </div>

      <div
        className={`flex lg:${forecastItems.length > 7 ? "overflow-x-auto" : "justify-between"} overflow-x-auto bg-card text-text px-4 py-6 rounded-br-card rounded-bl-card shadow-card gap-2.5`}
      >
        {forecastItems?.map((item, index) => {
          const dayName =
            index === 0 ? "Сегодня" : index === 1 ? "Завтра" : day(item);

          return <ForecastCard key={index} item={item} dayName={dayName} />;
        })}
      </div>
    </div>
  );
};

export default ForecastList;
