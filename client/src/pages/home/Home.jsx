import React, { useEffect, useState } from "react";
import Search from "../../components/search/Search";
import CurrentWeather from "../../components/currentWeather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../api";
import Forecast from "../../components/forecast/Forecast";
import styles from "./home.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch default weather and forecast for Colombo
    const fetchDefaultData = async () => {
      try {
        const colomboResponse = await fetch(
          `${WEATHER_API_URL}/weather?q=Colombo&appid=${WEATHER_API_KEY}&units=metric`
        );
        const colomboWeather = await colomboResponse.json();

        const colomboForecastResponse = await fetch(
          `${WEATHER_API_URL}/forecast?q=Colombo&appid=${WEATHER_API_KEY}&units=metric`
        );
        const colomboForecast = await colomboForecastResponse.json();

        setCurrentWeather({ city: "Colombo", ...colomboWeather });
        setForecast({ city: "Colombo", ...colomboForecast });
      } catch (error) {
        console.error("Error fetching default data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultData();
  }, []);

  const handleOnSearchChange = (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastFetch]).then(
        async (response) => {
          const weatherResponse = await response[0].json();
          const forcastResponse = await response[1].json();

          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forcastResponse });
        }
      );
    } catch {
      console.error("Error fetching default data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <section className={styles.search}>
          <Search onSearchChange={handleOnSearchChange} />
        </section>
      </div>
      <div className={styles.home}>
        <div className={styles.homeWrapper}>
          <div className={styles.weather}>
            <section className={styles.currentWeather}>
              {currentWeather && <CurrentWeather data={currentWeather} />}
            </section>
            <section className={styles.forecast}>
              {forecast && <Forecast data={forecast} />}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
