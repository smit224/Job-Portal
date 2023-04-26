import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";
import CompanyForm from "./components/ComapnayForm";
import SingleCompanyPage from "./pages/SingleCompanyPage";
import ShareJob from "./components/ShareJob";
import AppliedJobs from "./pages/AppliedJobs";
import YourJobs from "./pages/YourJobs";
import UpdatePassword from "./pages/UpdatePassword";
import UserInfo from "./pages/UserInfo";

axios.defaults.baseURL = "http://localhost:8001";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);
  console.log("User= ", user);

  return (
    <div className="font-display">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route path="/updatePassword" element={<UpdatePassword />} />

          <Route
            path="/add_company"
            element={!user ? <LoginPage /> : <CompanyForm />}
          />
          <Route
            path="/company/:id"
            element={!user ? <LoginPage /> : <SingleCompanyPage />}
          />

          <Route
            path="/company/:id/:id"
            element={!user ? <LoginPage /> : <AppliedJobs />}
          />

          <Route
            path="/job/:id"
            element={!user ? <LoginPage /> : <ShareJob />}
          />

          <Route
            path="/userinfo"
            element={!user ? <LoginPage /> : <UserInfo />}
          />

          <Route
            path="/yourjobs"
            element={!user ? <LoginPage /> : <YourJobs />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
