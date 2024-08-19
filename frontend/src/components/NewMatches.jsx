import React, { useEffect, useState } from "react";
import profile1 from "../assets/profiles/profile-1.jpg";
import profile2 from "../assets/profiles/profile-2.jpg";
import profile3 from "../assets/profiles/profile-3.jpg";
import { FaCrown } from "react-icons/fa6";
import { getRequest, baseurl } from "../utils/services";

const NewMatches = () => {
  const [users, setUsers] = useState([]);
  // const profileDetails = [
  //   {
  //     id: 1,
  //     name: "Raja",
  //     age: "26 Yrs",
  //     location: "Tirunelveli",
  //     pic: profile1,
  //     memberShip: "free",
  //   },
  //   {
  //     id: 2,
  //     name: "Munaf",
  //     age: "29 Yrs",
  //     location: "Selam",
  //     pic: profile2,
  //     memberShip: "premium",
  //   },
  //   {
  //     id: 3,
  //     name: "Chirstine",
  //     age: "27 Yrs",
  //     location: "Chennai",
  //     pic: profile3,
  //     memberShip: "free",
  //   },
  //   {
  //     id: 4,
  //     name: "Raja",
  //     age: "26 Yrs",
  //     location: "Tirunelveli",
  //     pic: profile1,
  //     memberShip: "free",
  //   },
  //   {
  //     id: 5,
  //     name: "Munaf",
  //     age: "29 Yrs",
  //     location: "Selam",
  //     pic: profile2,
  //     memberShip: "premium",
  //   },
  //   {
  //     id: 6,
  //     name: "Chirstine",
  //     age: "27 Yrs",
  //     location: "Chennai",
  //     pic: profile3,
  //     memberShip: "free",
  //   },
  //   {
  //     id: 7,
  //     name: "Raja",
  //     age: "26 Yrs",
  //     location: "Tirunelveli",
  //     pic: profile1,
  //     memberShip: "free",
  //   },
  //   {
  //     id: 8,
  //     name: "Munaf",
  //     age: "29 Yrs",
  //     location: "Selam",
  //     pic: profile2,
  //     memberShip: "premium",
  //   },
  //   {
  //     id: 9,
  //     name: "Chirstine",
  //     age: "27 Yrs",
  //     location: "Chennai",
  //     pic: profile3,
  //     memberShip: "free",
  //   },
  // ];
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseurl}/users`);
      console.log(response);
      setUsers(response);
    };
    getUsers();
  }, []);
  return (
    <main className="overflow-x-auto p-4">
      <div className="flex space-x-6 scrollbar-hide">
        {users.map((user) => (
          <div
            key={user._id}
            className={`${
              user.role === "premium"
                ? "bg-green-300 hover:bg-green-100 rounded-md hover:text-green-500"
                : "bg-gray-100 hover:bg-blue-100 rounded-md hover:text-blue-500"
            } flex flex-col items-center py-2 px-2 hover:scale-110 cursor-pointer transition-all duration-700 ease-in-out`}
            style={{ minWidth: "150px" }}
          >
            <img
              src={user.dp} // Adjust the image based on user role or other attribute
              className="h-32 rounded-md"
              alt={`${user.name}'s profile`}
            />
            <div className="flex flex-col items-center mt-2">
              {user.role === "premium" && (
                <FaCrown className="text-green-500" />
              )}
              <span className="text-md font-semibold">{user.name}</span>
              <span className="text-xs">
                {/* Add age and location if available in user data */}
                {user.age ? `${user.age} Yrs,` : ""}{" "}
                {user.location ? user.location : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default NewMatches;
