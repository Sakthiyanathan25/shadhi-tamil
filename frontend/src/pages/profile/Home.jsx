import React, { useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import "../../styles/progressbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {formDataLength,count} = useContext(AuthContext);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  return (
    <>
      <h4 className="text-xl text-gray-900 font-semibold">All Matches </h4>
      <h5 className="text-md text-gray-600 font-semibold">
        Members who match your partner preferences
      </h5>
      <div className="w-full overflow-x-auto pb-10">
        <ProfileCard />
      </div>
      <div className="w-full bg-orange-200 p-5 rounded-md shadow-sm text-center text-xl text-orange-500">
        <h2>Upgrade Your Account to Premium & Enjoy All Features</h2>
      </div>
      <div className="w-full border-[1px] cursor-pointer border-gray-200  p-5 my-3 rounded-md shadow-sm" onClick={()=>navigate(`/profile/edit/${user._id}`)}>
        <p className="text-base font-semibold text-gray-800">
          Complete Your Profile
        </p>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">Profile Completeness</span>
          <progress value={count} max={formDataLength} className="rounded-md" />
        </div>
      </div>
    </>
  );
};

export default Home;
