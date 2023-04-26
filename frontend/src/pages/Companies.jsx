import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Companies() {
  const [company, setCompany] = useState({});
  const [numOfJobs, setNumOfJobs] = useState({});
  const [responseState, setResponseState] = useState("idle");

  useEffect(() => {
    setResponseState("loading");
    axios.get("/company").then((response) => {
      setCompany(response.data.company_list);
      setNumOfJobs(response.data.num_of_jobs);
      setResponseState("success");
    });
  }, []);

  console.log("====company=====", company);
  console.log("====numOfJobs-----", numOfJobs);

  const renderResponse = () => {
    switch (responseState) {
      case "loading":
        return (
          <div className="mt-48 border-4 border-[#3498db] rounded-full h-[5rem] w-[5rem] container mx-auto animate-spin border-t-[#f3f3f3]"></div>
        );
      case "success":
        return (
          <div className="container mx-auto gap-x-11 gap-y-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-40">
            {company.length > 0 &&
              company.map((company, index) => (
                <div key={company._id} className="shadow-md rounded-2xl p-4">
                  <Link
                    to={"/company/" + company._id}
                    className="cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto my-4 mb-2 rounded-2xl flex">
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={
                          "http://localhost:8001/uploads/" + company.c_logo?.[0]
                        }
                        alt=""
                      />
                    </div>
                    <div className="pt-8 flex items-center justify-between">
                      <p className="text-xl">{company.c_name}</p>
                      <p className="text-xl text-[#60B3ED]">
                        {numOfJobs[index] + " Job(s)"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        );
      case "error":
        return <div className="mt-48">Error fetching response data</div>;
      default:
        return null;
    }
  };

  return <div>{renderResponse()}</div>;
}

export default Companies;
