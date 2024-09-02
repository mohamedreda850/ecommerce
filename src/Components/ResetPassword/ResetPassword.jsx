import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "./../../Context/AuthContext";
import Notfound from "../Notfound/Notfound";
import { usePasswordReset } from "../../Context/usePasswordReset";


export default function ResetPassword() {
    const { setToken } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { step } = usePasswordReset();
    if (step < 2) return <Notfound />;
    const user = {
      email: "",
      newPassword: "",
    };
    async function resetPassword(value) {
      setIsLoading(true);
      try {
        const {data} = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          value
        );
        toast.success(data.message);
        navigate("/");
        setToken(data.token);
        localStorage.setItem("tkn", data.token);
      } catch (e) {
        toast.error(e.response.data.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    const validation = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Enter valid email"),
        newPassword: Yup.string()
        .required("password is required")
        .matches(
          /^[A-Z][a-z 0-9]{3,10}$/,
          "password mustbe start withe uppercase"
        ),
    });
    const formik = useFormik({
      initialValues: user,
      onSubmit: resetPassword,
      validationSchema: validation,
    });
  
    return (
      <div className="py-[80px]">
       
        <div className="md:w-[60%] mx-auto md:p-0 p-5">
        <h1 className="mb-8 font-semibold text-3xl ">
         reset your password
        </h1>
          <form onSubmit={formik.handleSubmit}>
            {/* input email */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Email
              </label>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error</span> {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {/* input passwword */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter New Password
              </label>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error</span>{" "}
                {formik.errors.newPassword}
              </div>
            ) : (
              ""
            )}
            
            <button
              type="submit"
              className="float-end text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              {isLoading == true ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Login"
              )}
            </button>
          </form>
          
        </div>
      </div>
    );
}
