import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import weather_text from "../assets/weather_text.png";

export default function WeatherLogin() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const LoginScheme = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email !!!")
      .required("Email is required to fill"),
    password: Yup.string()
      .min(4, "Password is Weak")
      .matches(/^\S*$/, "No whitespaces allowed")
      .max(10, "Password is Strong")
      .required("Password is required"),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("response success", result);
      alert("Login success");
      localStorage.setItem("token", result.token);
      navigate("/WeatherApp");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        LoginScheme={LoginScheme}
      >
        <div className="w-96 border border-8 bg-white ">
          <div className="">
            <img src={weather_text} alt="Weather Logo" />
          </div>
          <Form className="flex flex-col mt-3 p-5">
            <Field
              name="email"
              type="email"
              placeholder="Your Email..."
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              name="password"
              type="password"
              placeholder="Your Password..."
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            <ErrorMessage name="password" component="div" />
            <button
              type="submit"
              className="bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
