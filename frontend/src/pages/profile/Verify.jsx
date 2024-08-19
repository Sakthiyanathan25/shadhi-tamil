import React from "react";

const Verify = () => {

  return (
    <div className="mt-[-0px] shadow border-[1px] py-10 px-5 h-fit my-5 border-gray-200 rounded-md w-full">
      <h3>Verify Account</h3>

      <div className="flex gap-4 mt-5">
        {cards.map(({id, name})=>(
          <card key={id} className="bg-blue-200 py-5 px-4 text-center rounded-md text-blue-500">
            {name}
          </card>
        ))}
      </div>
    </div>
  );
};

export default Verify;