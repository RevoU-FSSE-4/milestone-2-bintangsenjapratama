import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import weather_text from "../components/assets/weather_text.png";

export default function WeatherRegisterNew() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const RegisterScheme = Yup.object().shape({
    name: Yup.string()
      .min(4, "Too Short !!!")
      .max(20, "Too Long !!!")
      .required("Name is required to fill"),

    email: Yup.string()
      .email("Invalid email !!!")
      .required("Email is required to fill"),

    password: Yup.string()
      .min(4, "Password is Weak")
      .matches(/^\S*$/, "No whitespaces allowed")
      .max(10, "Password is Strong")
      .required("Password is required to fill"),
  });

  async function HandleRegister(values: any) {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      "https://library-crud-sample.vercel.app/api/user/register",
      options
    );
    const result = await response.json();

    try {
      if (!response.ok) {
        alert("Register Failed");
      } else {
        console.log("Resister Success", result);
        alert("Register Success");
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
    console.log("Register", result);
  }

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          RegisterScheme={RegisterScheme}
          onSubmit={HandleRegister}
        >
          <div className="w-96 border border-8 bg-white">
            <a href="" onClick={() => navigate("/")}>
              <p className="text-left p-3 text-2xl font-bold text-gray-400 cursor-pointer">
                ⇐ Back
              </p>
            </a>
            <div className=" p-1 flex items-center justify-center mt-8 pb-5">
              <img
                src={weather_text}
                alt="Weather Logo"
                className="w-80 rounded-xl"
              />
            </div>
            <div className=" my-5 mx-8">
              <h1 className="font-bold text-xl mb-3">Fill In Your Profil</h1>
              <p className="text-center">
                Please enter accurate information. It may be needed to recover
                your account should you forget your username or password.
              </p>
            </div>
            <Form className="flex flex-col mt-3 p-5 items-center justify-center">
              <Field
                name="name"
                type="text"
                placeholder="Fill Your Name..."
                className="border border-gray-300 p-2 mb-5 rounded-md w-80"
              />
              <ErrorMessage name="name" component="div" />

              <Field
                name="email"
                type="email"
                placeholder="Fill Your Email..."
                className="border border-gray-300 p-2 mb-5 rounded-md w-80"
              />
              <ErrorMessage name="email" component="div" />

              <Field
                name="password"
                type="password"
                placeholder="Fill Your Password..."
                className="border border-gray-300 p-2 mb-5 rounded-md w-80"
              />
              <ErrorMessage name="password" component="div" />
              <button
                type="submit"
                className="bg-blue-400 text-white font-semibold py-2 rounded-md w-80 hover:bg-blue-600 transition-colors duration-300"
              >
                Register
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
}
