import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { getRequest, baseurl } from "../../utils/services";
import "../../styles/profile.css";
import { FaCamera } from "react-icons/fa";

const EditProfile = () => {
  const {
    user,
    formData,
    updateFormData,
    isLoading,
    setFormData,
    updateUserProfile,
  } = useContext(AuthContext);
  const { userId } = useParams();
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(formData.dp || "");
  const inputRef = useRef(null);

  // communities
  const communities = [
    "Adaviyar",
    "Agamudayar",
    "Ambattar",
    "Arunattu Vellalar",
    "Ashtasahasram",
    "Chettiar",
    "Chozhia Vellalar",
    "Desikar",
    "Devanga",
    "Devendrakulam",
    "Elur Chetty",
    "Gounder",
    "Hebbar Iyengar",
    "Ilai Vaniyar",
    "Irula people",
    "Isai Vellalar",
    "Iyengar",
    "Iyer",
    "Jain communities",
    "Kaarkaathaar",
    "Kallar",
    "Kamma",
    "Kammalar",
    "Karaiyar",
    "Katesar",
    "Kodikaal Vellalar",
    "Koliyar",
    "Konar",
    "Kondaikatti Vellalar",
    "Kongu Vellalar",
    "Koravar",
    "Kosar people",
    "Koshta",
    "Kulala",
    "Kuravar",
    "Kuruba",
    "Kurumba Gounder",
    "Malai Vellalar",
    "Maravar",
    "Marakkar",
    "Meenavar",
    "Mudugar",
    "Mukkulathor",
    "Nadan",
    "Nadar",
    "Nadar climber",
    "Nagarathar",
    "Nankudi Vellalar",
    "Padmasali",
    "Palayakkara Naicker",
    "Palayakkaran",
    "Paliyan",
    "Panar",
    "Pannaiyar",
    "Paravar",
    "Pattanavar",
    "Pattariyar",
    "Pattusali",
    "Reddy",
    "Rowther",
    "Saurashtra people",
    "Sembadavar",
    "Sengunthar",
    "Siviyar",
    "Tamil Brahmin",
    "Tamil Jain",
    "Thigala",
    "Thondaimandala Vellalar",
    "Thuluva Vellala",
    "Thurumbar",
    "Udayar",
    "Uppara",
    "Vadama",
    "Vaddera",
    "Valangai",
    "Vallanattu Chettiar",
    "Valluvar",
    "Vannar",
    "Vanniyar",
    "Vathima",
    "Vatuka",
    "Velar",
    "Vellalar"
];


  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const response = await getRequest(`${baseurl}/users/${user._id}`);
        setLoading(false);
        if (!response.error) {
          setFormData(response);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("error in fetching user details", error);
      }
    };

    getUserDetails();
  }, [userId, setFormData, user._id]);

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imgname = e.target.files[0].name;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            (maxSize - img.width) / 2,
            (maxSize - img.height) / 2
          );
          canvas.toBlob(
            (blob) => {
              const file = new File([blob], imgname, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              setFormData({
                ...formData,
                dp: reader.result,
              });
              setImage(file); // Update the image state with the new File object
            },
            "image/jpeg",
            0.8
          );
        };
      };
    }
  };

  const getImageUrl = () => {
    try {
      if (image instanceof Blob) {
        return URL.createObjectURL(image);
      } else {
        return formData?.dp || "";
      }
    } catch (error) {
      console.error("Error creating object URL:", error);
      return formData?.dp || "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-full px-5 flex flex-col gap-4 overflow-y-auto">
      <form
        className="mt-[-20px]"
        onSubmit={(e) => updateUserProfile(e, user._id)}
      >
        <div className="shadow border-[1px] py-10 px-5 h-fit my-5 border-gray-200 rounded-md w-full">
          <h2 className="pb-2 text-xl font-semibold">Your Personal Details</h2>
          <hr className="w-32 h-1 rounded-full bg-pink-400 mb-3" />
          <div className="flex">
            <div className="w-[50%]">
              <div className="flex gap-5">
                <div className="flex gap-2 mb-4 items-center ">
                  <label className=" w-24">Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData?.name}
                    placeholder="Full name"
                    onChange={handleInputChange}
                    className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-4 items-center ">
                <label className=" w-24">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData?.email}
                  name="email"
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-2 mb-4 items-center ">
                <label className=" w-24">Phone</label>
                <input
                  type="string"
                  placeholder="Phone (+91)"
                  value={formData?.phone}
                  name="phone"
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-2 mb-4 items-center ">
                <label className=" w-24">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData?.dob}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-2 mb-4 items-center ">
                <label className="w-24">Address</label>
                <textarea
                  type="text"
                  name="address"
                  rows={5}
                  cols={30}
                  placeholder="Address"
                  value={formData?.address}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-2 mb-4 items-center ">
                <label className=" w-24">Gender</label>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData?.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <label>Male</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData?.gender === "female"}
                    onChange={handleInputChange}
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="" onClick={handleImage}>
                {image ? (
                  <>
                    <div className="updated-profile">
                      <img src={getImageUrl()} className="" alt="profile" />
                      <FaCamera className="camera-icon" />
                    </div>
                  </>
                ) : (
                  <>
                    {formData?.dp ? (
                      <div className="updated-profile">
                        <img src={formData?.dp} alt="dp" />
                        <FaCamera className="camera-icon" />
                      </div>
                    ) : (
                      <div className="profile-no">
                        <span className="font-semibold text-white text-6xl">
                          {formData?.name?.charAt(0).toUpperCase()}
                        </span>
                        <FaCamera className="camera-icon" />
                      </div>
                    )}
                  </>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="mt-6 pb-2 text-xl font-semibold">Measurements</h3>
            <hr className="w-32 h-1 rounded-full bg-pink-400" />
            <div className="flex gap-5">
              <div className="flex gap-3 mb-4 items-center mt-3">
                <label className="w-14">Height</label>
                <input
                  type="text"
                  placeholder="ft"
                  name="height"
                  value={formData?.height}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 mb-4 items-center mt-3">
                <label className="w-14">Weight</label>
                <input
                  type="text"
                  placeholder="kgs"
                  name="weight"
                  value={formData?.weight}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
            </div>
            <div className="flex gap-3 w-full mb-4 items-center mt-3">
                <label className="">Cig or Alcohol habits</label>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="cigOrAlcohol"
                    value="yes"
                    checked={formData?.cigOrAlcohol === "yes"}
                    onChange={handleInputChange}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="cigOrAlcohol"
                    value="no"
                    checked={formData?.cigOrAlcohol === "no"}
                    onChange={handleInputChange}
                  />
                  <label>No</label>
                </div>
              </div>
          </div>
          <div className="my-5">
            <h2 className="mt-3 text-xl font-semibold">
              Religion & Caste Details
            </h2>
            <hr className="w-32 h-1 rounded-full bg-pink-400 mb-3 mt-1" />
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <label>Caste</label>
                <select
                  className="border-gray-200 border-[1px] rounded-md outline-none w-60 py-2 px-3"
                  name="caste"
                  value={formData?.caste}
                  onChange={handleInputChange}
                >
                  <option>Select a caste</option>
                  {communities.map(caste => (
                <option key={caste} value={caste.toLowerCase().replace(/\s+/g, '-')}>
                    {caste}
                </option>))}
      
                </select>
              </div>
              <div className="flex gap-3 items-center">
                <label>Religion</label>
                <select
                  className="border-gray-200 border-[1px] rounded-md outline-none w-60 py-2 px-3"
                  name="religion"
                  value={formData?.religion}
                  onChange={handleInputChange}
                >
                  <option>Select a religion</option>
                  <option value="hindu">Hindu</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="pb-2 text-xl font-semibold">
              Education & Work Details
            </h2>
            <hr className="w-20 h-1 rounded-full bg-pink-400 mb-3" />
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-3 items-center">
                <label className="w-72">Higher Education Qualification</label>
                <select
                  className="border-gray-200 border-[1px] rounded-md outline-none w-60 py-2 px-3"
                  name="qualification"
                  value={formData?.qualification}
                  onChange={handleInputChange}
                >
                  <option>Select a qualification</option>
                  <option value="phd">PhD</option>
                  <option value="postGraduate">Post Graduate</option>
                  <option value="bachelorDegree">Bachelor's degree</option>
                  <option value="diploma">Diploma</option>
                </select>
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Your Occupation</label>
                <input
                  type="text"
                  placeholder="Occupation"
                  name="occupation"
                  value={formData?.occupation}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Salary (annum)</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary (annum)"
                  value={formData?.salary}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="pb-2 text-xl font-semibold">Family Details</h2>
            <hr className="w-20 h-1 rounded-full bg-pink-400 mb-3" />
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-3 items-center">
                <label className="w-72">Father's name</label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Father's name"
                  value={formData?.fatherName}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Father's Occupation</label>
                <input
                  type="text"
                  placeholder="Father's Occupation"
                  name="fatherOccupation"
                  value={formData?.fatherOccupation}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Mother's name</label>
                <input
                  type="text"
                  name="motherName"
                  placeholder="Mother's name"
                  value={formData?.motherName}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Mother's Occupation</label>
                <input
                  type="text"
                  placeholder="Mother's Occupation"
                  name="motherOccupation"
                  value={formData?.motherOccupation}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
              <div className="flex gap-3 items-center">
                <label className="w-72">Siblings</label>
                <input
                  type="text"
                  placeholder="Siblings"
                  name="siblings"
                  value={formData?.siblings}
                  onChange={handleInputChange}
                  className="border-[1px] border-gray-200 rounded-md w-60 focus:bg-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-10 gap-5">
            <button
              disabled={isLoading}
              className="px-3 py-2 w-[150px] rounded-full hover:bg-orange-400 hover:text-white hover:border-none border-[2px] border-orange-400 text-orange-400 transition-all duration-700"
            >
              {isLoading ? "Updating your profile" : "Update"}
            </button>
            <button className="px-3 py-2 w-[150px] rounded-full hover:bg-gray-500 hover:text-white hover:border-none border-[2px] bg-gray-400 text-white transition-all duration-700">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
