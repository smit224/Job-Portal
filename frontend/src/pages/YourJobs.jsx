import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function YourJobs() {
  const [yourJobs, setYourJobs] = useState([]);
  const [job, setJob] = useState([]);
  const [company, setCompany] = useState([]);

  const currentDate = new Date();
  const dateString = currentDate.toDateString();

  useEffect(() => {
    axios
      .get("/yourjobs")
      .then((res) => {
        setYourJobs(res.data.user_applied_jobs);
        setJob(res.data.applied_jobs);
        setCompany(res.data.applied_company);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
      <Header />
      <div className="mt-48">
        <div>
          <h1 className="flex items-center justify-center text-2xl my-6">
            Applied Jobs
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-3 my-3 mx-auto sm:w-1/2">
          {yourJobs &&
            yourJobs.map((yourjob, index) => (
              <div>
                <div className="shadow-lg p-5 rounded-lg">
                  <div className="rounded-lg h-20 w-28 mx-auto">
                    <img
                      className=""
                      src={
                        "http://localhost:8001/uploads/" +
                        company[index].c_logo?.[0]
                      }
                      alt=""
                    />
                  </div>
                  <div className="border-b border-gray-500 p-4 mb-5"></div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl">{job[index].j_title}</h1>
                    {yourjob.a_status === "New" ? (
                      <p className="bg-gray-200 p-2 text-gray-500 rounded-md">
                        Applied
                      </p>
                    ) : yourjob.a_status === "Interview" ? (
                      <p className="bg-blue-300 p-2 text-blue-600 rounded-md">
                        In Progress
                      </p>
                    ) : yourjob.a_status === "Offer" ? (
                      <p className="bg-green-300 p-2 text-green-600 rounded-md">
                        Accepted
                      </p>
                    ) : (
                      <p className="bg-rose-300 p-2 text-rose-500 rounded-md">
                        Reject
                      </p>
                    )}
                  </div>
                  <p>{company[index].c_name}</p>
                  <p>
                    {company[index].c_city}, {company[index].c_state}
                  </p>
                  <p className="text-gray-400 mt-3">{dateString}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default YourJobs;
