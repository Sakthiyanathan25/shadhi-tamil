import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  baseurl,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../utils/services";
import { toast } from "react-toastify";

const EditPreferences = () => {
  const { user } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [locationError, setLocationError] = useState("");
  const [castes, setCastes] = useState([]);
  const [casteInput, setCasteInput] = useState("");
  const [casteError, setCasteError] = useState("");
  const [ageFrom, setAgeFrom] = useState(18);
  const [ageTo, setAgeTo] = useState(18);
  const [preferenceExists, setPreferenceExists] = useState(false); // State to track if preferences exist

  useEffect(() => {
    // Fetch user preferences if they exist
    const fetchPreferences = async () => {
      try {
        const response = await getRequest(`${baseurl}/preferences/${user._id}`);
        console.log(response);

        if (response && response.preference) {
          const { ageRange, caste, location } = response.preference;

          // Set age range
          setAgeFrom(ageRange.minAge);
          setAgeTo(ageRange.maxAge);

          // Set locations
          if (location && Array.isArray(location)) {
            setLocations([...location]);
          }

          // Set castes
          if (caste && Array.isArray(caste)) {
            setCastes([...caste]);
          }

          // Set preferenceExists to true
          setPreferenceExists(true);
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchPreferences();
  }, [user._id]);

  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
    setLocationError("");
  };

  const handleCasteInputChange = (e) => {
    setCasteInput(e.target.value);
    setCasteError("");
  };

  const handleLocationInputKeyDown = (e) => {
    if (e.key === "Enter" && locationInput.trim() !== "") {
      if (locations.length < 3) {
        setLocations([...locations, locationInput.trim()]);
        setLocationInput("");
        setLocationError("");
      } else {
        setLocationError("You can only add up to 3 locations.");
      }
    }
  };

  const handleCasteInputKeyDown = (e) => {
    if (e.key === "Enter" && casteInput.trim() !== "") {
      if (castes.length < 3) {
        setCastes([...castes, casteInput.trim()]);
        setCasteInput("");
        setCasteError("");
      } else {
        setCasteError("You can only add up to 3 castes.");
      }
    }
  };

  const handleLocationRemove = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
    setLocationError("");
  };

  const handleCasteRemove = (index) => {
    const updatedCastes = [...castes];
    updatedCastes.splice(index, 1);
    setCastes(updatedCastes);
    setCasteError("");
  };

  const handleAgeFromChange = (e) => {
    setAgeFrom(parseInt(e.target.value));
  };

  const handleAgeToChange = (e) => {
    setAgeTo(parseInt(e.target.value));
  };

  // Generate options for age selection
  const ageOptions = [];
  for (let age = 18; age <= 50; age++) {
    ageOptions.push(
      <option key={age} value={age}>
        {age}
      </option>
    );
  }

  const handlePreference = async (e) => {
    e.preventDefault();

    const preferencesData = {
      userId: user._id,
      ageRange: {
        minAge: ageFrom,
        maxAge: ageTo,
      },
      location: locations,
      caste: castes,
    };

    try {
      if (preferenceExists) {
        // Use putRequest if preferences exist
        const response = await putRequest(
          `${baseurl}/preferences/${user._id}`,
          JSON.stringify(preferencesData)
        );
        console.log("Preferences updated:", response);
        toast("Your preferences updated...!")
      } else {
        console.log("form data", preferencesData)
        // Use postRequest if preferences don't exist (assuming it's a create endpoint)
        const response = await postRequest(
          `${baseurl}/preferences/create`,
          JSON.stringify(preferencesData)
        );
        toast("Your preferences added...!")
        console.log("Preferences created:", response);
      }
      // Optionally, you can show a success message or handle further actions after successful save
    } catch (error) {
      console.error("Error saving preferences:", error);
      // Handle error scenarios, such as displaying an error message to the user
    }
  };

  const handleDeletePreferences = async () => {
    try {
      const response = await deleteRequest(`${baseurl}/preferences/${user._id}`);
      console.log("Preferences deleted:", response);
      toast.success("Preferences deleted successfully...!")
      // Optionally, update UI or show a success message indicating preferences were deleted
      setAgeFrom(18);
      setAgeTo(18);
      setLocations([]);
      setCastes([]);
      setPreferenceExists(false);
    } catch (error) {
      console.error("Error deleting preferences:", error);
      // Handle error scenarios, such as displaying an error message to the user
    }
  };

  return (
    <div className="shadow border-[1px] mt-[-2px] py-10 px-5 h-fit my-5 border-gray-200 rounded-md w-full">
      <h3 className="text-center font-semibold text-xl text-black/80">
        Your Preferences
      </h3>
      <form onSubmit={handlePreference}>
        <h4>Basic Preferences</h4>
        <hr className="w-32 h-1 rounded-full bg-pink-400 mb-3" />
        <label>Age Range</label>
        <div className="flex gap-4 py-5">
          <div className="flex gap-2 items-center">
            <label className="">Age From</label>
            <select
              className="border-gray-200 border-[1px] rounded-md outline-none w-60 py-2 px-3"
              value={ageFrom}
              onChange={handleAgeFromChange}
            >
              {ageOptions}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="">Age To</label>
            <select
              className="border-gray-200 border-[1px] rounded-md outline-none w-60 py-2 px-3"
              value={ageTo}
              onChange={handleAgeToChange}
            >
              {ageOptions}
            </select>
          </div>
        </div>
        <hr />
        <div className="my-5">
          <label>
            Location{" "}
            <span className="text-xs text-red-500">
              * maximum 3 locations only
            </span>{" "}
          </label>
          <input
            type="text"
            value={locationInput}
            onChange={handleLocationInputChange}
            onKeyDown={handleLocationInputKeyDown}
            className="border-gray-200 border-[1px] rounded-md outline-none py-2 px-3 w-full"
            placeholder="Enter locations"
          />
          {locationError && (
            <p className="text-red-500 text-xs mt-1">{locationError}</p>
          )}
          <div className="mt-2">
            {locations.map((loc, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mt-2"
              >
                {loc}
                <button
                  type="button"
                  onClick={() => handleLocationRemove(index)}
                  className="ml-2"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="my-5">
          <label>
            Castes{" "}
            <span className="text-xs text-red-500">
              * maximum 3 castes only
            </span>{" "}
          </label>
          <input
            type="text"
            value={casteInput}
            onChange={handleCasteInputChange}
            onKeyDown={handleCasteInputKeyDown}
            className="border-gray-200 border-[1px] rounded-md outline-none py-2 px-3 w-full"
            placeholder="Enter castes"
          />
          {casteError && (
            <p className="text-red-500 text-xs mt-1">{casteError}</p>
          )}
          <div className="mt-2">
            {castes.map((caste, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mt-2"
              >
                {caste}
                <button
                  type="button"
                  onClick={() => handleCasteRemove(index)}
                  className="ml-2"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3"
          >
            Save Preferences
          </button>
          {preferenceExists
            ? preferenceExists && (
                <button
                  type=""
                  onClick={handleDeletePreferences}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-3"
                >
                  Delete Preferences
                </button>
              )
            : null}
        </div>
      </form>
    </div>
  );
};

export default EditPreferences;
