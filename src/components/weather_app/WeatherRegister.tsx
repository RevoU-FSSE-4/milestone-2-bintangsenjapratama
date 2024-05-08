import { useNavigate } from "react-router-dom";
import weather from "../assets/weather.png";

export default function WeatherRegister() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className="w-auto border border-8 bg-white ">
        <div>
          <div className="bg-cyan-500 p-1 flex items-center justify-center gap-10">
            <img
              src={weather}
              alt="Weather Logo"
              className="w-40 drop-shadow-2xl"
            />
            <a
              onClick={() => navigate("/RegisterNew")}
              className="text-xl mr-5 text-white font-medium cursor-pointer"
            >
              <p className="hover:bg-blue-600">Register Here</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
