import { Link, Navigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser, ready } = useContext(UserContext);
  console.log("========user=====", user, ready);
  const [redirect, setRedirect] = useState(null);

  const handleLogout = async () => {
    console.log("----btn---");
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  return (
    <>
      <nav className="dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex gap-3">
            <img src={Logo} className="h-12" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Job Portal
            </span>
          </a>
          <div className="flex text-white text-xl">
            <ul className="flex flex-col py-4 mr-8 ">
              <li>
                <a
                  href="#"
                  className="dark:hover:text-green-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
            {!user && (
              <Link
                to="/login"
                type="button"
                className="py-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login / Signup
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="py-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
