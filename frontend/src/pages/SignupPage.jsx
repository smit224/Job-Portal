import Header from "../components/Header";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [redirect, setRedirect] = useState(false)

  const registerUser = (e) => {
    e.preventDefault();

    axios
      .post("/registration", {
        name,
        email,
        password,
        userType,
      })
      .then((response) => {
        console.log("-=Register response-=-=-=-", response);
        if (response.status === 200 || response.status === 201) {
        //   <Navigate to="/" />;
        setRedirect(true)
          console.log("Login Successful");
        }
      })
      .catch((e) => {
        console.log("Just console things");
      });
  };

  if(redirect){
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="">
      <Header></Header>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-green-700 underline">
            Sign up
          </h1>
          <form className="mt-6" onSubmit={registerUser}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Smit Trambadia"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md"
              />
            </div>
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
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md"
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
                }}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md"
              />
            </div>
            <div className="mt-6">
              {/* <Select
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md"
                options={options}
              /> */}
              <label className="block text-sm font-semibold text-gray-800">
                You are
              </label>
              <select
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md"
              >
                <option>Please Select</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <div className="mt-6">
              <button
                // onClick={registerUser}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
