import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(null);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    await axios
      .post("/resetpassword", { email, password })
      .then((res) => {
        console.log("-=--=-=resss-=-=", res);
        if (res.data.error) {
          setError(res.data.error);
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          setUpdatedSuccessfully(res.data.message);
          setTimeout(() => {
            setUpdatedSuccessfully(null);
          }, 2000);
        }
      })
      .catch((e) => {
        console.log("------------", e);
      });
  };

  return (
    <div>
      <Header />
      <div className="">
        <div className="flex justify-center items-center sm:h-screen">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-[#60B3ED] underline">
              Reset Password
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
                  }}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                />
              </div>
              <div>
                {error ? (
                  <p className="text-red-500">**{error}</p>
                ) : (
                  <p className="text-green-500">{updatedSuccessfully}</p>
                )}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleUpdatePassword}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#60B3ED] rounded-md hover:bg-[#2C79E8] focus:outline-none focus:bg-[#60B3ED]"
                >
                  Update Password
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              Back to&nbsp;
              <Link
                to="/login"
                className="font-medium text-[#60B3ED] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
