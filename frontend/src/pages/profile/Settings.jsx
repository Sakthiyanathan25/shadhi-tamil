import React from "react";

const Settings = () => {
  const cards = [
    { id: 1, name: "Change Password" },
    { id: 2, name: "Reset Password" },
    { id: 3, name: "Deactivate Account" },
    { id: 4, name: "Delete Account" },
  ];
  return (
    <div className="mt-[-0px] shadow border-[1px] py-10 px-5 h-fit my-5 border-gray-200 rounded-md w-full">
      <h3>Settings</h3>

      <div className="flex gap-4 mt-5">
        {cards.map(({id, name})=>(
          <card key={id} className="bg-blue-200 hover:bg-blue-500 cursor-pointer hover:text-white duration-700 transition-all py-5 px-4 text-center rounded-md text-blue-500">
            {name}
          </card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
