import NewMatches from "../components/NewMatches";
import { BsFillSearchHeartFill } from "react-icons/bs";
const Matches = () => {
  
  return (
    <main className="w-full h-[100vh] flex px-[5%] py-5">
      <aside className="w-[30%] border-[1px] py-10 px-5 h-fit my-5 border-gray-200 rounded-md">
        <div className="flex items-center gap-3">
          <input className="px-3 py-1 border-[1px] w-fit h-fit rounded-md border-gray-300 focus:bg-pink-100 transition-all duration-700 outline-none" />{" "}
          <BsFillSearchHeartFill className="text-pink-500 rounded-full text-2xl w-10 h-10 p-2 border-[2px] border-pink-400 hover:text-white hover:bg-pink-500 transition-all duration-700 cursor-pointer"/>
        </div>
      </aside>
      <div className="w-[70%]">
        <NewMatches />
      </div>
    </main>
  );
};

export default Matches;
