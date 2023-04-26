import Header from "./Header";
import { useState, useEffect } from "react";
import { country_data, state_data } from "../constants/data";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CompanyForm = () => {
  const [ready, setReady] = useState(false);
  const [country, setCountry] = useState([]);
  const [st, setSt] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [common, setCommon] = useState({
    cname: "",
    cemail: "",
    caddress: "",
    ccity: "",
    czipcode: "",
    cwebsite: "",
    ccountry: "",
    cstate: "",
    clogo: addedPhotos,
  });

  useEffect(() => {
    const getcountry = country_data;
    setCountry(getcountry[0].data);
  }, []);

  const handleOnchange = (e) => {
    setCommon({ ...common, [e.target.name]: e.target.value });
  };

  const onchangeSelectCountry = (e) => {
    common.ccountry = e.target.value;
    state_data.forEach((element) => {
      if (element.country_name === e.target.value) {
        setSt(element.states);
      }
    });
  };

  const onchangeSelectState = (e) => {
    setCommon({ ...common, cstate: e.target.value });
  };

  // Added Company Logo From The Local Drive

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
        setAddedPhotos((prev) => {
          return [...filenames];
        });
        setCommon({ ...common, clogo: response.data });
      })
      .catch("Something went Wrong");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await axios.post("/createcompany", common).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setReady(true);
      }
    });
  };

  if (ready) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto my-12 p-2.5 animate-fade-in mt-48">
        <div>
          <form
            className="w-11/12 max-w-[600px] px-10 py-10 rounded-3xl bg-white border-2 border-gray-100 m-auto"
            onSubmit={handleSubmit}
          >
            <h3 className="text-5xl font-semibold font-display">
              Add Company Details
            </h3>

            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium gap-1 mb-5">
                  <p className="text-lg font-medium">Company Logo:</p>
                  <input
                    type="file"
                    className=""
                    onChange={uploadPhotoFromLocal}
                  />
                </label>

                <label className="text-lg font-medium">Country:</label>
                <select
                  name="ccountry"
                  className="form-control w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={(e) => onchangeSelectCountry(e)}
                >
                  {country[0] && country[0].country_name}
                  <option>--Select Country--</option>
                  {country.map((getcon) => (
                    <option key={getcon.country_id} value={getcon.country_name}>
                      {getcon.country_name}
                    </option>
                  ))}
                </select>

                <label className="text-lg font-medium mt-4">
                  Company Name:
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  name="cname"
                  onChange={(e) => handleOnchange(e)}
                />

                <label className="text-lg font-medium mt-4">Email:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  name="cemail"
                  onChange={(e) => handleOnchange(e)}
                />

                <label className="text-lg font-medium  mt-4">Address:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  name="caddress"
                  onChange={(e) => handleOnchange(e)}
                />

                <label className="text-lg font-medium  mt-4">State:</label>
                <select
                  name="state"
                  className="form-control w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={(e) => onchangeSelectState(e)}
                >
                  <option>--Select State--</option>
                  {st.map((stt, index) => (
                    <option key={index} value={stt.state_name}>
                      {stt.state_name}
                    </option>
                  ))}
                </select>

                <div className="flex">
                  <div className="pr-3.5">
                    <label className="text-lg font-medium  mt-4">City:</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      type="text"
                      name="ccity"
                      onChange={(e) => handleOnchange(e)}
                    />
                  </div>

                  <div>
                    <label className="text-lg font-medium mt-4">Zipcode:</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      type="text"
                      name="czipcode"
                      onChange={(e) => handleOnchange(e)}
                    />
                  </div>
                </div>

                <label className="text-lg font-medium mt-4">Website:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  name="cwebsite"
                  onChange={(e) => handleOnchange(e)}
                />
              </div>
            </div>
            <div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#60B3ED] rounded-xl text-white font-bold text-lg hover:bg-[#2C79E8]">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
