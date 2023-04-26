import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AppliedJobModal from "../components/AppliedJobModal";

function AppliedJobs() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [userss, setUserss] = useState([]);
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [singleApplicant, setSingleApplicant] = useState(null);

  const currentDate = new Date();
  const dateString = currentDate.toDateString();

  useEffect(() => {
    axios
      .get(`/appliedjobs/${id}`)
      .then((res) => {
        setApplicants(res.data.applicant);
        setJob(res.data.job);
        setUserss(res.data.users);
      })
      .catch((error) => {
        console.log("error while fetching applicant");
      });
  }, []);

  const handleSelectChange = (event) => {
    event.preventDefault();
    const obj = {
      applied_job_status: event.target.value,
      applied_job_id: event.target.name,
    };
    // Make an Axios GET request with the selected value
    axios
      .post("/status", obj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModalClick = (applicant) => {
    setSingleApplicant(applicant);
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      {job && (
        <div className="container my-16 mx-auto mt-48">
          <div className="sm:flex items-center">
            <button
              className="flex items-center p-1 border rounded-md gap-x-2 mr-[35%] border-gray-300"
              onClick={handleBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Back</p>
            </button>
            <h1 className="font-semibold text-3xl">{job.j_title}</h1>
          </div>
          <div className="my-8 border-b border-gray-300"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-3">
            <div className="bg-gray-200 rounded-sm p-4">
              <h1 className="text-2xl font-semibold">New</h1>
              <div className="class-wrapper">
                {applicants &&
                  applicants.map((applicantInterview, index) =>
                    applicantInterview.a_status === "New" ? (
                      <div
                        onClick={() => handleModalClick(applicantInterview)}
                        key={applicantInterview._id}
                      >
                        <div className="bg-white py-4 px-8 my-4 rounded-md flex flex-col items-start gap-2">
                          <div
                            className="text-xl text-[#60B3ED] hover:text-[#2C79E8] cursor-pointer"
                            onClick={() => setShowModal(true)}
                          >
                            {userss[index][0].name}
                          </div>

                          <p className="text-gray-400">{dateString}</p>
                        </div>
                        <div>
                          <AppliedJobModal
                            isVisible={showModal}
                            onClose={() => {
                              setShowModal(false);
                            }}
                            applicantInterview={applicantInterview}
                            applicantId={applicantInterview._id}
                            index={index}
                            userss={userss[index]}
                            singleApplicant={singleApplicant}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="hidden"></p>
                    )
                  )}
              </div>
            </div>
            <div className="bg-gray-200 rounded-sm p-4">
              <h1 className="text-2xl font-semibold">Interview</h1>
              <div>
                {applicants &&
                  applicants.map((applicantInterview, index) =>
                    applicantInterview.a_status === "Interview" ? (
                      <div
                        onClick={() => handleModalClick(applicantInterview)}
                        key={applicantInterview._id}
                      >
                        <div className="bg-white py-4 px-8 my-4 rounded-md flex flex-col items-start gap-2">
                          <div
                            className="text-xl text-[#60B3ED] hover:text-[#2C79E8] cursor-pointer"
                            onClick={() => setShowModal(true)}
                          >
                            {userss[index][0].name}
                          </div>

                          <p className="text-gray-400">{dateString}</p>
                        </div>
                        <div>
                          <AppliedJobModal
                            isVisible={showModal}
                            onClose={() => {
                              setShowModal(false);
                            }}
                            applicantInterview={applicantInterview}
                            applicantId={applicantInterview._id}
                            index={index}
                            userss={userss[index]}
                            singleApplicant={singleApplicant}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="hidden"></p>
                    )
                  )}
              </div>
            </div>
            <div className="bg-gray-200 rounded-sm p-4">
              <h1 className="text-2xl font-semibold">Made Offer</h1>
              <div>
                {applicants &&
                  applicants.map((applicantInterview, index) =>
                    applicantInterview.a_status === "Offer" ? (
                      <div
                        onClick={() => handleModalClick(applicantInterview)}
                        key={applicantInterview._id}
                      >
                        <div className="bg-white py-4 px-8 my-4 rounded-md flex flex-col items-start gap-2">
                          <div
                            className="text-xl text-[#60B3ED] hover:text-[#2C79E8] cursor-pointer"
                            onClick={() => setShowModal(true)}
                          >
                            {userss[index][0].name}
                          </div>
                          <p className="text-gray-400">{dateString}</p>
                        </div>
                        <div>
                          <AppliedJobModal
                            isVisible={showModal}
                            onClose={() => {
                              setShowModal(false);
                            }}
                            applicantInterview={applicantInterview}
                            applicantId={applicantInterview._id}
                            index={index}
                            userss={userss[index]}
                            singleApplicant={singleApplicant}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="hidden"></p>
                    )
                  )}
              </div>
            </div>
            <div className="bg-gray-200 rounded-sm p-4">
              <h1 className="text-2xl font-semibold">Disqualified</h1>
              <div>
                {applicants &&
                  applicants.map((applicantInterview, index) =>
                    applicantInterview.a_status === "Reject" ? (
                      <div
                        onClick={() => handleModalClick(applicantInterview)}
                        key={applicantInterview._id}
                      >
                        <div className="bg-white py-4 px-8 my-4 rounded-md flex flex-col items-start gap-2">
                          <div
                            className="text-xl text-[#60B3ED] hover:text-[#2C79E8] cursor-pointer"
                            onClick={() => setShowModal(true)}
                          >
                            {userss[index][0].name}
                          </div>

                          <p className="text-gray-400">{dateString}</p>
                        </div>
                        <div>
                          <AppliedJobModal
                            isVisible={showModal}
                            onClose={() => {
                              setShowModal(false);
                            }}
                            applicantInterview={applicantInterview}
                            applicantId={applicantInterview._id}
                            index={index}
                            userss={userss[index]}
                            singleApplicant={singleApplicant}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="hidden"></p>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppliedJobs;
