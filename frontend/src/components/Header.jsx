import { Link, Navigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((ev) => console.log("====logout na thyu===="));
    setRedirect(true);
    console.log("-=-redirect-=-=", redirect);
    console.log("====user===", user);
  };

  if (redirect) {
    console.log("Redirect= ", redirect);
    return <Navigate to="/login" />;
  }

  return (
    <>
      <nav className="bg-white-900 w-full text-black shadow-lg fixed top-0 z-50 bg-white">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex gap-3 ml-8">
            <img src={Logo} className="h-12" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Job Portal
            </span>
          </Link>
          <div className="flex text-xl mr-8">
            {!user && (
              <Link
                to="/login"
                type="button"
                className="py-4 bg-[#60B3ED] hover:bg-[#2C79E8] focus:outline-none font-medium rounded-lg px-4 text-center text-white md:mr-0 dark:bg-text-[#60B3ED]"
              >
                Login / Signup
              </Link>
            )}
            {user && (
              <>
                <ul className="flex py-4 items-center gap-5">
                  <li>
                    <Link to={"/"} className=" hover:text-[#2C79E8]">
                      Home
                    </Link>
                  </li>
                  {user.user_type === "job_seeker" && (
                    <>
                      <li>
                        <Link to={"/yourjobs"} className="hover:text-[#2C79E8]">
                          Your Jobs
                        </Link>
                      </li>
                    </>
                  )}
                  {user.user_type === "employer" && (
                    <>
                      <li>
                        <Link
                          to={"/add_company"}
                          className="hover:text-[#2C79E8]"
                        >
                          Add Company
                        </Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <>
                      <li>
                        <Link to={"/userinfo"} className="hover:text-[#2C79E8]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-4 bg-[#60B3ED] hover:bg-[#2C79E8] focus:ring-4 focus:outline-none font-medium rounded-lg px-4 text-center text-white md:mr-0 dark:bg-text-[#60B3ED] dark:hover:bg-[#2C79E8]"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
