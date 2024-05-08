import React from "react";
// import WeatherApp from "../components/weather_app/WeatherApp";
import WeatherLogin from "../components/weather_app/WeatherLogin";
import WeatherRegister from "../components/weather_app/WeatherRegister";

const Home = () => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex flex-row justify-center">
        <div className="flex items-center justify-center gap-10">
          <WeatherLogin />
          <WeatherRegister />
        </div>
      </div>
    </div>
  );
};

export default Home;
