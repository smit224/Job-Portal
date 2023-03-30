import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";

axios.defaults.baseURL = "http://localhost:8001";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);
  console.log("====user from app jsx=====", user);

  return (
    <div className="">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
