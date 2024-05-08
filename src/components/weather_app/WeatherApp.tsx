import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeatherApp.css";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const WeatherApp = () => {
  let api_key = "b963c2def17a0cb0cf469ec9949919fa";

  const navigate = useNavigate();

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const elements = document.getElementsByClassName("cityInput");
    if (elements.length > 0) {
      const element = elements[0];
      if (element instanceof HTMLInputElement) {
        if (element.value === "") {
          return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName(
          "weather-temperature"
        );
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear_icon);
        } else if (
          data.weather[0].icon === "02d" ||
          data.weather[0].icon === "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          data.weather[0].icon === "03d" ||
          data.weather[0].icon === "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "04d" ||
          data.weather[0].icon === "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon === "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "10d" ||
          data.weather[0].icon === "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "13d" ||
          data.weather[0].icon === "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
      }
    }
  };

  async function handleLogout(event: any) {
    event.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/logout",
        options
      );
      if (!response.ok) {
        throw new Error("failed to logout");
      }
      const result = await response.json();
      console.log(result.token);

      setTimeout(() => {
        alert("Logout Success");
        localStorage.clear();
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temperature">24°C</div>
      <div className="weather-location">Bandung</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">60%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/hour</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="center-1 top-3 absolute bg-cyan-400 hover:bg-cyan-600 p-2 text-white font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WeatherApp;
