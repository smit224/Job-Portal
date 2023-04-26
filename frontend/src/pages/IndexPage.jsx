import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Companies from "./Companies";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ApplicantIndexPage from "./ApplicantIndexPage";
import LoginPage from "./LoginPage";

const IndexPage = () => {
  const { user } = useContext(UserContext);
  console.log("++++++USERRRR+++++++", user);
  return (
    <div className="">
      <Header />
      {user && user.user_type === "employer" && <Companies />}
      {user && user.user_type === "job_seeker" && <ApplicantIndexPage />}
      {user == null && <Navigate to="/login" />}
    </div>
  );
};

export default IndexPage;
