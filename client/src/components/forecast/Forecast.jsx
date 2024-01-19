import React, { useState } from "react";
import styles from "./forecast.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const [showMore, setShowMore] = useState(false);

  const handleViewMore = () => {
    setShowMore(!showMore);
  };

  // Use a state to track the number of forecast days to display
  const daysToDisplay = showMore ? Math.min(data.list.length, 7) : 3;

  return (
    <>
      <label className={styles.title}>Daily Forecast</label>
      <div className={styles.accordion}>
        <Accordion allowZeroExpanded>
          {data.list.slice(0, daysToDisplay).map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className={styles.dailyItem}>
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      className={styles.iconSmall}
                      alt="weather"
                    />
                    <label className={styles.day}>{forecastDays[idx]}</label>
                    <label className={styles.description}>
                      {item.weather[0].description}
                    </label>
                    <label className={styles.minMax}>
                      {Math.round(item.main.temp_max)}°C /
                      {Math.round(item.main.temp_min)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={styles.dailyDetailsGrid}>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className={styles.dailyDetailsGridItem}>
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {data.list.length > 3 && (
        <button className={styles.viewMoreBtn} onClick={handleViewMore}>
          {showMore ? "View Less" : "View More"}
        </button>
      )}
    </>
  );
};

export default Forecast;
