import React from "react";
import parse from "html-react-parser";
import axios from "axios";

function AppliedJobModal({
  isVisible,
  applicantId,
  userss,
  onClose,
  singleApplicant,
}) {
  if (!isVisible) return null;
  console.log("siiiignnngngngnngng", singleApplicant);

  const currentDate = new Date();
  const dateString = currentDate.toDateString();

  const handleSelectChange = (event) => {
    // event.preventDefault();
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

  return (
    <div>
      {singleApplicant?._id === applicantId ? (
        <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex mt-[8rem] justify-center">
          <div className="w-[600px] flex flex-col">
            <button
              className="text-white text-xl place-self-end"
              onClick={() => onClose()}
            >
              X
            </button>
            <div>
              <main className="main bg-white px-6 md:px-16 py-6">
                <div className="w-full max-w-[99%] mx-auto">
                  {userss && (
                    <>
                      <div className="flex items-center justify-between">
                        <h1 className="text-4xl">{userss[0].name}</h1>
                        {singleApplicant.a_status === "New" ? (
                          <p className="bg-gray-200 p-2 text-gray-500 rounded-md">
                            Applied
                          </p>
                        ) : singleApplicant.a_status === "Interview" ? (
                          <p className="bg-blue-300 p-2 text-blue-600 rounded-md">
                            In Progress
                          </p>
                        ) : singleApplicant.a_status === "Offer" ? (
                          <p className="bg-green-300 p-2 text-green-600 rounded-md">
                            Accepted
                          </p>
                        ) : (
                          <p className="bg-rose-300 p-2 text-rose-500 rounded-md">
                            Reject
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-x-5 my-4">
                        <div className="flex gap-x-1">
                          <span className="material-symbols-outlined">
                            mail
                          </span>
                          <p>{userss[0].email}</p>
                        </div>
                        <div className="flex gap-x-1">
                          <span class="material-symbols-outlined">call</span>
                          <p>+213-550-6432</p>
                        </div>
                      </div>
                      <div className="my-4">
                        <p className="font-bold text-xl"> Candidate Resume</p>
                        <div className="flex border border-gray-400 p-3 my-2 max-w-[10rem] rounded-md">
                          <span class="material-symbols-outlined">article</span>
                          <a
                            className=""
                            href={
                              "http://localhost:8001/uploads/" +
                              singleApplicant.a_resume?.[0]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            Resume File
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-xl"> Candidate Skills</p>
                        <div className="flex gap-x-3">
                          {singleApplicant &&
                            singleApplicant.a_skills.map((skill) => (
                              <p className="bg-gray-400 p-3 mt-2 text-white rounded-md max-w-fit">
                                {skill}
                              </p>
                            ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-xl mt-5">
                          Candidate Summary
                        </p>
                        <p>{parse(singleApplicant.a_summary)}</p>
                      </div>
                      <p className="text-gray-400 mt-3">
                        Applied on {dateString}
                      </p>
                      <div></div>
                      <div>
                        <p className="font-bold text-xl mt-5">Make Decision</p>
                        <select
                          className="border border-gray-300 p-2 rounded-md w-full my-2"
                          name={singleApplicant._id}
                          onChange={handleSelectChange}
                        >
                          
                          <option value="New">New</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Reject">Reject</option>
                        </select>
                      </div>
                    </>
                  )}
                  <button className="bg-[#60B3ED] w-full p-4 text-white rounded-md mt-5 hover:bg-[#2C79E8] text-lg" onClick={() => window.location.reload()}>
                    Update
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AppliedJobModal;
