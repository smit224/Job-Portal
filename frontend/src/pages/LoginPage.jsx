import Header from "../components/Header";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("/login", { email, password })
      .then((res) => {
        setUser(res.data);
        setRedirect(true);
        console.log("-=--=-=data-=-=");
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
  };
  // console.log("====ee==", error);

  // console.log("===redirect===", redirect);
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header></Header>
      {/* <div className="relative flex flex-col justify-center sm:h-[40rem] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#60B3ED] underline">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name=""
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
              />
            </div>
            <div>
              <Link
                to="/updatePassword"
                className="text-xs text-[#60B3ED] hover:underline"
              >
                Forget Password?
              </Link>
              {error && <p className="text-red-500">**{error}</p>}
            </div>
            <div className="mt-6">
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#60B3ED] rounded-md hover:bg-[#2C79E8] focus:outline-none focus:bg-[#60B3ED]"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-[#60B3ED] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div> */}
      <section className="container mx-auto h-screen">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>

            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div className="mb-5 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-[2rem] text-[#428efb]">
                    Sign in
                  </p>
                </div>
                <div className="relative mb-6">
                  <label></label>
                  <input
                    type="email"
                    value={email}
                    className="peer block min-h-[auto] w-full rounded border px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                    // id="exampleFormControlInput2"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                  />
                </div>

                <div className="relative mb-6">
                  <label></label>
                  <input
                    type="password"
                    value={password}
                    className="peer block min-h-[auto] w-full rounded border px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 "
                      type="checkbox"
                      value=""
                      id="exampleCheck2"
                    />
                    <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                      Remember me
                    </label>
                  </div>

                  <Link to="/updatePassword" className="text-[#428efb]">
                    Forgot password?
                  </Link>
                </div>
                {error && <p className="text-red-500">**{error}</p>}

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block rounded bg-[#428efb] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="text-[#428efb] transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
