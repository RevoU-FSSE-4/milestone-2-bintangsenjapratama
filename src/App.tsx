import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherRegisterNew from "./pages/RegisterNew";
import WeatherApp from "./components/weather_app/WeatherApp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RegisterNew" element={<WeatherRegisterNew />} />
        <Route path="WeatherApp" element={<WeatherApp />} />
      </Routes>
    </div>
  );
}

export default App;
