import styles from "./Forecast.module.css";

interface ForecastItem {
    date: string;
    temp: number;
    condition: string;
    icon: string;
}

interface ForecastProps {
    forecast: ForecastItem[];
}

export default function Forecast({ forecast }: ForecastProps) {
    if (!forecast || forecast.length === 0) return null;

    return (
        <div className={styles.list}>
            {forecast.map((item) => (
                <div key={item.date} className={styles.item}>
                    <p>
                        {new Date(item.date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                        })}
                    </p>

                    <img
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.condition}
                    />

                    <p>{Math.round(item.temp)}°C</p>
                    <p>{item.condition}</p>
                </div>
            ))}
        </div>
    );
}
