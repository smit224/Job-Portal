import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddJobModal from "../components/AddJobModal";

const SingleCompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/company/${id}`).then((response) => {
      setCompany(response.data);
    });
    axios.get(`/jobs/${id}`).then((response) => {
      setJobs(response.data);
    });
  }, [id]);

  console.log("=====jobs-=---", jobs);

  return (
    <>
      <Header />

      <Fragment>
        <div className="container mx-auto my-16 p-4 mt-48">
          <div className="w-32 h-32 relative flex flex-row gap-5">
            <img
              className="h-full rounded-lg"
              src={"http://localhost:8001/uploads/" + company.c_logo?.[0]}
              alt=""
            />
            {/* <a href={"http://localhost:8001/uploads/" + company.c_logo?.[0]} target="_blank" rel="noreferrer">
              Open First PDF
            </a> */}
            <div>
              <h2 className="text-3xl font-medium">{company.c_name}</h2>
              <div className="md:flex text-center items-center justify-between gap-4 leading-8 md:leading-[4rem]">
                <div className="flex gap-1 items-center">
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <p className="hidden md:block">{company.c_state},</p>
                  <p className="whitespace-nowrap">{company.c_country}</p>
                </div>
                <div className="flex gap-1 items-center">
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
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <p>{company.c_website}</p>
                </div>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer bg-[#60B3ED] rounded-full p-2 text-white w-fit pr-4"
                onClick={() => setShowModal(true)}
              >
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
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <span>Add Job</span>
              </div>
            </div>
          </div>

          <AddJobModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
          />

          <div>
            {jobs.length > 0 &&
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="my-10 sm:flex gap-10 p-8 rounded-lg shadow-md shadow-gray-300"
                >
                  <div className="lg:max-w-[43rem] xl:max-w-[60rem] 2xl:max-w-[75rem]">
                    <h1 className="text-3xl text-[#60B3ED]">{job.j_title}</h1>
                    <p className="text-md text-gray-400">
                      {job.j_salary_range}
                    </p>
                    <div className="flex gap-1 items-center leading-[3rem]">
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
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <p className="hidden md:block">{company.c_state},</p>
                      <p className="whitespace-nowrap">{company.c_country}</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime mollitia, molestiae quas vel sint commodi
                      repudiandae consequuntur voluptatum laborum numquam
                      blanditiis harum quisquam eius sed odit fugiat iusto fuga
                      praesentium optio, eaque rerum! Provident similique
                      accusantium nemo autem. Veritatis obcaecati tenetur iure
                      eius earum ut molestias architecto voluptate aliquam
                      nihil, eveniet aliquid culpa officia aut! Impedit sit sunt
                      quaerat, odit, tenetur error, harum nesciunt ipsum debitis
                      quas aliquid. Reprehenderit, quia. Quo neque error
                      repudiandae fuga? Ipsa laudantium molestias eos sapiente
                      officiis modi at sunt excepturi expedita sint? Sed
                      quibusdam recusandae alias error harum maxime adipisci
                      amet laborum. Perspiciatis minima nesciunt dolorem!
                      Officiis iure rerum voluptates a cumque velit quibusdam
                      sed amet tempora. Sit laborum ab, eius fugit doloribus
                      tenetur fugiat, temporibus enim commodi iusto libero magni
                    </p>
                  </div>
                  <div className="sm:flex flex-col md:items-end  text-center gap-y-5  mt-3 sm:mt-0">
                    <Link className="font-medium text-gray-500" to={`${job._id}`}>
                      {job.j_applicant ? <p>Number of applicant(s): {job.j_applicant}</p> : <p>Number of applicant(s): 0</p>}
                    </Link>
                    <p className="rounded-full border-2 border-[#60B3ED] p-4 text-[#60B3ED]">
                      {job.j_type}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default SingleCompanyPage;
