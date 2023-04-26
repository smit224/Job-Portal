import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Header from "./Header";

function ShareJob() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [responseState, setResponseState] = useState("idle");
  const [company, setCompany] = useState([]);

  console.log("_+_+_+_+_+_USEPARAMS+_+_+_+", id);

  useEffect(() => {
    setResponseState("loading");
    axios
      .get(`/job/${id}`)
      .then((res) => {
        console.log("_+_+_+_+_+_resss_+_+_+_", res);
        setJob(res.data.job);
        setCompany(res.data.company);
      })
      .catch((error) => {
        console.log("error while fetching t");
      });
    console.log("effect 1");
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     axios.get(`/company/${jobs.company_id}`).then((response) => {
  //       setCompany(response.data);
  //       setResponseState("success");
  //     });
  //   }
  //   fetchData();
  // }, []);

  console.log("_+_+_+_+_+_job_+_+_+_", job);
  console.log("+_+_+_+_+company)_)_)_)_", company);
  return (
    <>
      <Header />
      <div className="container mx-auto my-8 gap-x-11 grid grid-cols-2 mt-48">
        <div className="mx-auto  my-8 gap-x-11">
          {job && (
            <div
              data-test-id={job._id}
              key={job._id}
              className="shadow-sm activejobs rounded-2xl p-4 h-[30rem] w-[30rem] overflow-hidden border border-gray-400 cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center text-xl">
                  <h1>{job.j_title}</h1>
                  <span>
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
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </span>
                </div>

                {company && <p>{company.c_name}</p>}

                <div className="flex gap-6 my-2">
                  <div className="flex gap-2 p-2 bg-gray-200 rounded-md">
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
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                    <p>{job.j_salary_range}</p>
                  </div>
                  <div className="flex gap-2 p-2 bg-gray-300 rounded-md">
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
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p>{job.j_type}</p>
                  </div>
                </div>
                <div className="">
                  <Link to="/" className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#2C79E8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                    <p>Easy Apply</p>
                  </Link>

                  <Link
                    className="button"
                    to={`/alljobs?id=${encodeURIComponent(job._id)}`}
                  >
                    Click me!
                  </Link>
                  {/* <button data-test-id={job._id} onClick={showJobDetails}>
                                Click Me
                              </button> */}

                  <div className="my-4">
                    <h2 className="font-bold">Job Description</h2>
                    {/* <p>{parse(job.j_description)}</p> */}
                    <div
                      className="px-4 job_desc"
                      dangerouslySetInnerHTML={{
                        __html: job.j_description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container mx-auto gap-x-11">
          <div
            key={job._id}
            className="mx-auto sticky my-8 top-2 max-h-screen w-full"
          >
            <div className="shadow-sm activejobs rounded-2xl p-4 border border-gray-400">
              <div>
                <div className="flex justify-between items-center text-lg">
                  <h1 className="font-bold">{job.j_title}</h1>
                  <span>
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
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex gap-6 my-2">
                  <div className="flex gap-2 p-2 bg-gray-200 rounded-md">
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
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                    <p>{job.j_salary_range}</p>
                  </div>
                  <div className="flex gap-2 p-2 bg-gray-300 rounded-md">
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
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p>{job.j_type}</p>
                  </div>
                </div>
                {/* <div className=""> */}
                <div className="my-4 max-h-[60rem] overflow-y-scroll">
                  <h2 className="font-bold">Job Description</h2>
                  <div
                    className="px-4 job_desc"
                    dangerouslySetInnerHTML={{
                      __html: job.j_description,
                    }}
                  ></div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareJob;
