import Header from "../components/Header";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();
  console.log("===subpage==", subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading....";
  }

  const handleLogout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (redirect === "/") {
    return <Navigate to={"/"} />;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Header />
     

      {subpage === "profile" && (
        <div className="text-center mx-auto mt-8">
          <h1 className="text-4xl">Hi, I'm {user.name}</h1>
          <p className="text-gray mt-2.5">Joind in 2023</p>
          <p href="" className="underline mt-1 cursor-pointer">
            Edit profile
          </p>
          <div className="flex gap-1 justify-center mt-9 font-semibold text-2xl mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-5">0 reviews</p>
          </div>
          {/* <div className="border-b border-gray"></div> */}
          <p href="" className="underline cursor-pointer">
            Reviews by you
          </p>
          {/* <div className="border-b my-8 border-opacity-50 border-gray-500"></div> */}
          <button className="primary max-w-sm mt-5" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
