import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

const Header = () => {
  return (
    <>
      <nav class="dark:bg-gray-900 w-full">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex gap-3">
            <img src={Logo} class="h-12" alt="Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Job Portal
            </span>
          </a>
          <div class="flex text-white text-xl">
            <ul class="flex flex-col py-4 mr-8 ">
              <li>
                <a
                  href="#"
                  class="dark:hover:text-green-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
            <Link
            to="/login"
              type="button"
              class="py-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login / Signup
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
