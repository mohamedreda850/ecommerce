import React, { useContext, useState } from "react";
import logo from "./../../assets/images/freshcart-logo.svg";
import profile from "./../../assets/images/login.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "./../../Context/AuthContext";
import { cartContext } from "../../Context/CartContextt";
import { initFlowbite } from "flowbite";

const Navbar = () => {
  const { setToken, token } = useContext(authContext);
  const navigate = useNavigate();
  const { numOfItems } = useContext(cartContext);

  function logout() {
    setToken(null);
    localStorage.removeItem("tkn");
    navigate("/login");
  }

 
    return (
      <>
        <nav className="bg-slate-200 border-green-200 dark:bg-green-900  h-[70px] fixed top-0 right-0 left-0 z-50">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <NavLink
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Flowbite Logo" />
            </NavLink>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                className="flex text-sm bg-green-800 rounded-full md:me-0 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={profile}
                  alt="user photo"
                />
              </button>

              <div
                className="z-50 hidden my-4 text-base list-none bg-slate-200 divide-y divide-green-100 rounded-lg shadow dark:bg-green-700 dark:divide-green-600"
                id="user-dropdown"
              >
             
               
                <ul className="px-4 py-3 " aria-labelledby="user-menu-button">
                  <div className="">
                    {token ? (
                      <>
                        <button onClick={logout} className="mx-5 ">
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <li>
                          <NavLink className="lg:mx-5 mb-5" to="/login">
                            Login
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="lg:mx-5 mb-5" to="/register">
                            Register
                          </NavLink>
                        </li>
                      </>
                    )}
                  </div>
                </ul>
              
              </div>
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-green-100 rounded-lg bg-green-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-200 dark:bg-green-800 md:dark:bg-green-900 dark:border-green-700">
                {token ? (
                  <>
                    {" "}
                    <li className="mt-4 lg:ml-4">
                      <NavLink to="/">Product</NavLink>
                    </li>
                    <li className="mt-4 lg:ml-4">
                      <NavLink to="/brand">Brands</NavLink>
                    </li>
                    <li className="mt-4 lg:ml-4">
                      <NavLink to="/category">Category</NavLink>
                    </li>
                    <li className="mt-4 lg:ml-4">
                      <NavLink to="/allorders">All Orders</NavLink>
                    </li>
                    <li className="mt-4 lg:ml-4">
                      <NavLink to="/wishlist">Wish List</NavLink>
                    </li>
                    <li className="mt-4 lg:ml-4 relative">
                      <NavLink to="/cart">
                        Cart
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-green-900">
                          {numOfItems}
                        </div>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  
   
};

export default Navbar;
