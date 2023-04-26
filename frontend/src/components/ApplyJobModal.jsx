import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ApplyJobModal = ({ isVisible, onClose, particularJob }) => {
  const [selected, setSelected] = useState([]);
  const [addedResume, setAddedResume] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [jobApplied, setJobApplied] = useState({
    a_resume: addedResume,
    a_summary: "",
    a_experience: "",
    a_skills: null,
    a_status: "New",
  });
  const [showDiv, setShowDiv] = useState(false);
  const [already, setAlready] = useState(false);
  const [yourJobs, setYourJobs] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    axios
      .get("/yourjobs")
      .then((res) => {
        setYourJobs(res.data.user_applied_jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnchange = (e) => {
    setJobApplied({ ...jobApplied, [e.target.name]: e.target.value });
  };

  const handleAppliedJob = (id, ev) => {
    ev.preventDefault();

    const emp_arr = [];
    for (let i = 0; i < yourJobs.length; i++) {
      emp_arr.push(yourJobs[i].job_id);
    }

    if (emp_arr.includes(id)) {
      setAlready(true);
      setTimeout(() => {
        setAlready(false);
      }, 2000);
    } else {
      axios
        .post("/createjobsapplied", {
          jobApplied,
          inputValues,
          particularJob: particularJob._id,
        })
        .then((res) => {
          setShowDiv(true);

          setTimeout(() => {
            setShowDiv(false);
          }, 2000);
        });
    }
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      window.location.reload();
    }, 2000);
  };

  const job_que = [];
  if (particularJob) {
    for (let i = 0; i < 3; i++) {
      job_que.push(particularJob.j_skills[i]);
    }
  }

  const abc = (e) => {
    setJobApplied({ ...jobApplied, a_skills: e });
  };

  const uploadPhotoFromLocal = (ev) => {
    const file = ev.target.files[0];
    const formData = new FormData();
    formData.append("photos", file);

    axios
      .post("/companylogo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedResume((prev) => {
          return [...filenames];
        });
        setJobApplied({ ...jobApplied, a_resume: response.data });
      })
      .catch("Something went Wronggggggg");
  };

  if (!isVisible) return null;

  const handleque = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center mt-[8rem]">
      {particularJob && (
        <div className="w-[600px] flex flex-col">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            X
          </button>
          <div>
            <main className="main bg-white px-6 md:px-16 py-6">
              <div className="flex items-center justify-center">
                {showDiv && (
                  <span className="bg-green-300 p-2 text-green-600 rounded-md">
                    Applied Successfully
                  </span>
                )}
                {already && (
                  <span className="bg-green-300 p-2 text-green-600 rounded-md">
                    Already Applied For this job
                  </span>
                )}
              </div>
              <div className="w-full max-w-[99%] mx-auto rounded-md">
                <form>
                  <h1 className="text-2xl mb-2 font-bold shadow-sm rounded-lg p-4">
                    Apply for <span>{particularJob.j_title}</span>
                  </h1>

                  <div className="my-5">
                    <div className="flex flex-col gap-3">
                      <label className="text-lg font-semibold">
                        Add your resume
                      </label>

                      <input
                        type="file"
                        className=""
                        name="a_resume"
                        onChange={uploadPhotoFromLocal}
                      />
                    </div>

                    <div className="w-full my-4">
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">
                          Brief Summary About Yourself
                        </label>
                      </div>

                      <CKEditor
                        name="j_description"
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setJobApplied({ ...jobApplied, a_summary: data });
                        }}
                      />
                    </div>

                    <div className="mb-4 w-full">
                      <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">
                          Add your proficient skills
                        </label>
                        <TagsInput
                          className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                          value={selected}
                          onChange={(e) => {
                            setSelected;
                            abc(e);
                          }}
                          name="a_skills"
                        />
                        <em>press enter to add new tag</em>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2">
                        Questions
                      </label>
                      <div>
                        <p className="block text-gray-700 text-sm mb-2">
                          How many years of &nbsp;
                          <strong>{particularJob.j_title}</strong>
                          &nbsp;experience do you have?
                        </p>
                        <input
                          className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                          type="number"
                          name="a_experience"
                          onChange={(e) => handleOnchange(e)}
                        />
                      </div>
                      <div>
                        {job_que &&
                          job_que.map((skill) => (
                            <div key={skill}>
                              <p className="block text-gray-700 text-sm mb-2">
                                How many years of &nbsp;<strong>{skill}</strong>
                                &nbsp;experience do you have?
                              </p>
                              <input
                                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                                type="number"
                                name={skill}
                                onChange={(e) => handleque(e)}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(ev) => handleAppliedJob(particularJob._id, ev)}
                    className="cursor-pointer py-3 bg-[#60B3ED] hover:bg-[#2C79E8] focus:ring-4 focus:outline-none focus:ring-[#60B3ED] font-medium rounded-lg px-4 text-center text-white md:mr-0 dark:bg-text-[#60B3ED] dark:hover:bg-[#2C79E8] dark:focus:ring-[#2C79E8]"
                  >
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJobModal;
