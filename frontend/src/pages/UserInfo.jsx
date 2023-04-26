import React from "react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";
import { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

function UserInfo() {
  const { user } = useContext(UserContext);
  console.log("-=-=-user-=-=", user);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(null);
  const [notUpdated, setNotUpdated] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    axios.get("/profile").then((res) => {
      const { data } = res;
      setUserName(data.name);
      setPhone(data.phone);
      setLinkedinURL(data.linkedInURL);
      setJobRole(data.job_role);
      setGender(data.gender);
    });
  }, []);

  const updateUserInfo = async (e) => {
    e.preventDefault();
    console.log("-=-=-=TESTING-=-=-=-=-");
    const userData = {
      userName,
      phone,
      linkedinURL,
      jobRole,
      gender,
    };
    await axios
      .put("/userInfo", {
        userData,
      })
      .then((res) => {
        setUpdatedSuccessfully(res.data.message);
        setTimeout(() => {
          setUpdatedSuccessfully(null);
        }, 2000);
      })
      .catch((err) => {
        setNotUpdated(err);
        console.log("-=-=-=-=ERROR-=-=-=-", err);
      });
  };

  return (
    <>
      <Header />
      {updatedSuccessfully && (
        <p className="bg-green-300 p-2 text-green-600 rounded-md mt-44 container mx-auto max-w-xs text-center">
          {updatedSuccessfully}
        </p>
      )}
      <div
        className={
          updatedSuccessfully
            ? "container mx-auto mt-1"
            : "container mx-auto mt-44"
        }
      >
        <div className="bg-gray-200 flex items-center justify-between p-8 rounded-lg">
          <h1 className="text-3xl">{user.name}</h1>
          <ul className="sm:flex gap-x-4">
            <li
              className={
                show
                  ? "hidden"
                  : "flex gap-x-2 bg-[#428efb] p-3 rounded-md text-gray-100"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              <button onClick={(e) => setShow(true)}>Update</button>
            </li>

            <li
              className={
                show
                  ? "flex gap-x-2 bg-white p-3 rounded-md text-black"
                  : "hidden"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <button onClick={() => setShow(false)}>Cancel</button>
            </li>
            <li
              className={
                show
                  ? "flex gap-x-2 bg-[#428efb] p-3 rounded-md text-gray-100"
                  : "hidden"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <button onClick={(e) => updateUserInfo(e)}>Save Cahnges</button>
            </li>
          </ul>
        </div>
        <div className={show ? "bg-gray-100 rounded-md" : "hidden"}>
          <div className="grid grid-cols-3 p-3 items-center  gap-x-11 mt-4 border-b border-gray-200">
            <h2 className="text-base col-span-1 ml-5">Username</h2>
            <input
              className="w-1/2 p-3 col-span-2 rounded-md"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-3 p-3 items-center gap-x-11 border-b border-gray-200">
            <h2 className="text-base col-span-1 ml-5">Phone Number</h2>
            <input
              className="w-1/2 p-3 col-span-2 rounded-md"
              type="Number"
              placeholder="123-456-7890"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-3 p-3 items-center  gap-x-11 border-b border-gray-200">
            <h2 className="text-base col-span-1 ml-5">Linkedin URL</h2>
            <input
              className="w-1/2 p-3 col-span-2 rounded-md"
              type="text"
              placeholder="https://www.linkedin.com/in/jin-yung-choi/"
              value={linkedinURL}
              onChange={(ev) => setLinkedinURL(ev.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-3 p-3 items-center  gap-x-11 border-b ">
            <h2 className="text-base col-span-1 ml-5">Role</h2>
            <input
              className="w-1/2 p-3 col-span-2 rounded-md"
              type="text"
              placeholder="eg: Full Stack"
              value={jobRole}
              onChange={(ev) => setJobRole(ev.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-3 p-3 items-center  gap-x-11 border-b ">
            <h2 className="text-base col-span-1 ml-5">Gender</h2>
            <select
              className="w-1/2 p-3 col-span-2 rounded-md"
              type="text"
              placeholder="eg: Full Stack"
              value={gender}
              onChange={(ev) => setGender(ev.target.value)}
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
