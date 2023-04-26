import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";

const AddJobModal = ({ isVisible, onClose }) => {
  const { id } = useParams();
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState([]);
  const [job, setJob] = useState({
    j_title: "",
    j_type: "",
    j_location: "",
    j_salary: "",
    j_category: "",
    j_description: "",
    company_id: id,
    j_skills: [],
    j_applicant: 0,
  });

  const handleOnchange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleCreateJob = async (ev) => {
    ev.preventDefault();
    await axios.post("/createjob", job).then(() => {
      setReady(true);
      alert("Job Added Successfully");
    });
  };

  if (!isVisible) return null;

  const abc = (e) => {
    setJob({ ...job, j_skills: e });
  };

  return (
    <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center mt-[8rem]">
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
              <form>
                <h1 className="text-2xl mb-2">Post new job</h1>

                <div className="py-2 mb-5">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Title
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                      type="text"
                      name="j_title"
                      placeholder="Frontend Developer"
                      onChange={(e) => handleOnchange(e)}
                    />
                  </div>

                  <div className="md:flex gap-2">
                    <div className="w-full md:w-3/12 mb-4 md:mb-0">
                      <label className="block text-gray-700 text-sm mb-2">
                        Job Type
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                          name="j_type"
                          onChange={(e) => handleOnchange(e)}
                        >
                          <option value=""></option>
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-3/12 mb-4 md:mb-0">
                      <label className="block text-gray-700 text-sm mb-2">
                        Job Location
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                          name="j_location"
                          onChange={(e) => handleOnchange(e)}
                        >
                          <option value=""></option>
                          <option>Onsite</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 w-full md:w-3/6">
                      <label className="block text-gray-700 text-sm mb-2">
                        Salary Range
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                        type="text"
                        name="j_salary"
                        placeholder="$50 - $60 per hour"
                        onChange={(e) => handleOnchange(e)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-sm mb-2">
                      Add skills for this job
                    </label>
                    <TagsInput
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                      value={selected}
                      name="j_skills"
                      onChange={(e) => {
                        setSelected;
                        abc(e);
                      }}
                    />
                    <em>press enter to add new tag</em>
                  </div>

                  <div className="w-full mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        name="j_category"
                        onChange={(e) => handleOnchange(e)}
                      >
                        <option value=""></option>
                        <option value="SDE">Software Development</option>
                        <option value="Designing">Designing</option>
                        <option value="Mechanical">Mechanical</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full my-4 md:mb-0">
                    <label className="block text-gray-700 text-sm mb-2">
                      Description
                    </label>
                    <div className="editor">
                      <CKEditor
                        name="j_description"
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setJob({ ...job, j_description: data });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-3 bg-[#60B3ED] hover:bg-[#2C79E8] focus:ring-4 focus:outline-none focus:ring-[#60B3ED] font-medium rounded-lg px-4 text-center text-white md:mr-0 dark:bg-text-[#60B3ED] dark:hover:bg-[#2C79E8] dark:focus:ring-[#2C79E8]">
                  <button onClick={handleCreateJob} className="">
                    Create job
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
