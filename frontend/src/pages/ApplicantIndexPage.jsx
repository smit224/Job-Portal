import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, resolvePath, useParams } from "react-router-dom";
import parse from "html-react-parser";
import ApplyJobModal from "../components/ApplyJobModal";

function ApplicantIndexPage() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState([]);
  const [particularJob, setparticularJob] = useState(null);
  const [particularCompany, setParticularCompany] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDiv, setShowDiv] = useState(null);
  const [filteredJob, setFilteredJob] = useState(jobs);
  const [filteredCompany, setFilteredCompany] = useState(jobs);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [searchJobs, setSearchJobs] = useState("");

  //   state machine states

  const [responseState, setResponseState] = useState("idle");

  useEffect(() => {
    setResponseState("loading");
    axios
      .get("/alljobs")
      .then((res) => {
        setJobs(res.data.jobs);
        setFilteredJob(res.data.jobs);
        setCompany(res.data.company);
        setResponseState("success");
      })
      .catch((error) => {
        console.log("error while fetching t");
      });
    console.log("effect 1");
  }, []);

  const handleButtonClick = (job, index) => {
    axios.get(`/job/${job._id}`).then((response) => {
      setparticularJob(response.data.job);
      setParticularCompany(response.data.company);
    });
    setActiveIndex(index);
  };

  function handleClick(id) {
    const textToCopy = `http://localhost:5173/job/${id}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => console.log(`Copied ${textToCopy} to clipboard`))
      .catch((err) => console.error("Failed to copy text: ", err));
    setShowDiv(id);
    setTimeout(() => {
      setShowDiv(null);
    }, 2000);
  }

  function handleFilter(event) {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedCategory([...checkedCategory, value]);
    } else {
      setCheckedCategory(checkedCategory.filter((val) => val !== value));
    }
  }

  useEffect(() => {
    const arr = [...jobs];
    if (checkedCategory.length === 0) {
      setFilteredJob(jobs);
      setFilteredCompany(company);
    } else {
      const selected_category = arr.filter((job, index) =>
        checkedCategory.includes(job.j_category)
      );
      setFilteredJob(selected_category);

      const dummy = [];
      for (let z = 0; z < selected_category.length; z++) {
        for (let y = 0; y < company.length; y++) {
          if (selected_category[z].company_id === company[y]._id) {
            dummy.push(company[y]);
            break;
          } else {
            continue;
          }
        }
      }
      setFilteredCompany(dummy);
    }
  }, [checkedCategory]);

  const handleSearchBar = () => {
    if (searchJobs === "") {
      setFilteredJob(jobs);
      setFilteredCompany(company);
    } else {
      const arr = [...jobs];
      const search_job = arr.filter((job) =>
        `${job.j_title.toLowerCase()} ${job.j_type.toLowerCase()} ${job.j_skills
          .join(",")
          .toLowerCase()}`.includes(searchJobs.toLowerCase())
      );
      setFilteredJob(search_job);

      const dummy = [];
      for (let z = 0; z < search_job.length; z++) {
        for (let y = 0; y < company.length; y++) {
          if (search_job[z].company_id === company[y]._id) {
            dummy.push(company[y]);
            break;
          } else {
            continue;
          }
        }
      }
      setFilteredCompany(dummy);
    }
  };

  const renderResponse = () => {
    switch (responseState) {
      case "loading":
        return (
          <div className="mt-48 border-4 border-[#3498db] rounded-full h-[5rem] w-[5rem] container mx-auto animate-spin border-t-[#f3f3f3]"></div>
        );
      case "success":
        return (
          <div className="container mx-auto mt-48">
            <div className="">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center justify-center mt-12 gap-x-2 bg-gray-300 p-6 rounded-md mx-auto sm:mr-0"
              >
                <span className="text-white">
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  placeholder="search by title, keyword or job type"
                  className="w-1/2 h-9 rounded-sm p-2"
                  type="text"
                  onChange={(e) => setSearchJobs(e.target.value)}
                />
                <button
                  onClick={() => handleSearchBar()}
                  className="cursor-pointer p-3 bg-[#2C79E8] focus:outline-none font-medium rounded-lg text-center text-white dark:bg-text-[#60B3ED] lg:w-1/12"
                >
                  Search
                </button>
              </form>
            </div>

            <div className=" my-4 gap-y-11 md:grid md:grid-cols-8">
              <div className="md:my-8 mx-auto col-span-1">
                <div className="flex gap-x-2 items-start justify-center">
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
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                    />
                  </svg>

                  <h1 className="text-2xl">Categories</h1>
                </div>
                <div className="mt-4">
                  <div className="flex gap-x-2 items-center justify-start mb-4 text-lg">
                    <label>Mechanical</label>
                    <input
                      type="checkbox"
                      onChange={handleFilter}
                      name="Mechanical"
                      value="Mechanical"
                      className="bg-gray-500 p-3 rounded-md text-white"
                    />
                  </div>
                  <div className="flex gap-x-2 items-center justify-start mb-4 text-lg">
                    <label>SDE</label>
                    <input
                      type="checkbox"
                      onChange={handleFilter}
                      className="bg-gray-500 p-3 rounded-md text-white"
                      name="SDE"
                      value="SDE"
                    />
                  </div>
                  <div className="flex gap-x-2 items-center justify-start mb-4 text-lg">
                    <label>Designing</label>
                    <input
                      type="checkbox"
                      onChange={handleFilter}
                      className="bg-gray-500 p-3 rounded-md text-white"
                      name="Designing"
                      value="Designing"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto my-8 gap-y-11 flex flex-col col-span-3">
                {filteredJob.length > 0 &&
                  filteredJob.map((job, index) => (
                    <div
                      data-test-id={job._id}
                      key={index}
                      className={
                        activeIndex === index
                          ? "active activejobs shadow-sm rounded-2xl p-4  border border-gray-400 cursor-pointer mx-[1rem]"
                          : "shadow-sm activejobs rounded-2xl p-4  border border-gray-400 cursor-pointer mx-[1rem]"
                      }
                      onClick={() => handleButtonClick(job, index)}
                    >
                      <div>
                        <div className="flex justify-between items-center text-2xl font-black">
                          <h1>{job.j_title}</h1>
                          <div className="flex items-center gap-x-1">
                            <button onClick={() => handleClick(job._id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                />
                              </svg>
                            </button>

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
                          </div>
                        </div>
                        <div className="relative">
                          {job._id === showDiv && (
                            <span className="absolute top-0 right-0 bg-gray-100 p-2 rounded-md text-gray-500 w-[6.5rem]">
                              Link Copied
                            </span>
                          )}
                        </div>

                        <div>
                          {filteredCompany.length > 0 && (
                            <>
                              <p>{filteredCompany[index].c_name}</p>
                              <p>{filteredCompany[index].c_address}</p>
                              <p>
                                {filteredCompany[index].c_city}{" "}
                                {company[index].c_state},{" "}
                                {filteredCompany[index].c_zipcode}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-x-2 mt-4">
                          <p className="font-bold">Category:</p>
                          <p>{job.j_category}</p>
                        </div>

                        <div className="text-gray-500">
                          {job.j_applicant ? (
                            <p>Number of applicant(s): {job.j_applicant}</p>
                          ) : (
                            <p>Number of applicant(s): 0</p>
                          )}
                        </div>

                        <div className="flex gap-4 my-2 items-center">
                          <div className="flex gap-2 p-2 bg-gray-200 rounded-md items-center">
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
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-[#2C79E8]"
                            >
                              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                            <p
                              onClick={() => {
                                setShowModal(true);
                              }}
                              className="border-b-2 border-gray-500 hover:text-[#2C79E8] hover:border-[#2C79E8]"
                            >
                              Easy Apply
                            </p>
                          </Link>

                          <div className="mt-4 max-h-[197px] overflow-hidden">
                            <h2 className="font-bold">Job Description</h2>
                            <div className="">{parse(job.j_description)}</div>
                          </div>
                        </div>
                        <p className="text-gray-500 my-2">Posted 10 days ago</p>
                      </div>
                    </div>
                  ))}
              </div>
              {particularJob && (
                <div
                  key={particularJob._id}
                  className="mx-auto  md:my-8 top-5 max-h-screen w-full hidden md:block col-span-4 mt-48 sticky"
                >
                  <div className="shadow-sm sticky activejobs rounded-2xl p-8 border border-gray-400">
                    <div>
                      <div className="flex justify-between items-center text-lg">
                        <h1 className="font-bold text-3xl">
                          {particularJob.j_title}
                        </h1>
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

                      <div>
                        <div className="flex gap-1 text-[#2C79E8] items-center my-4">
                          <Link to={particularCompany.c_website}>
                            {particularCompany.c_name}
                          </Link>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500">
                          {particularCompany.c_country}
                        </p>
                        <p className="text-black-500">
                          Email : {particularCompany.c_email}
                        </p>
                        <p>
                          {particularJob.j_salary_range} -{" "}
                          {particularJob.j_type}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center justify-center cursor-pointer p-3 w-1/3 mt-4 bg-[#2C79E8] hover:bg-[#60B3ED] focus:ring-4 focus:outline-none focus:ring-[#60B3ED] font-medium rounded-lg px-4 text-center text-white md:mr-0 dark:bg-text-[#60B3ED] dark:hover:bg-[#2C79E8] dark:focus:ring-[#2C79E8]">
                        <Link
                          to={particularCompany.c_website}
                          target="_blank"
                          className=""
                        >
                          Apply Here
                        </Link>
                        <span className="material-symbols-outlined">
                          open_in_new
                        </span>
                      </div>

                      <div className="flex gap-4 justify-start mt-4">
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
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <div className="flex gap-x-3 gap-y-2 w-1/2 flex-wrap">
                          {particularJob.j_skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-gray-400 p-3 text-white rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="my-4 max-h-[60rem] overflow-y-scroll">
                        <h2 className="font-bold">Job Description</h2>
                        <div
                          className="px-4 job_desc"
                          dangerouslySetInnerHTML={{
                            __html: particularJob.j_description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <ApplyJobModal
                particularJob={particularJob}
                index={activeIndex}
                appliedJobs={jobs}
                isVisible={showModal}
                onClose={() => setShowModal(false)}
              />
            </div>
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

export default ApplicantIndexPage;
