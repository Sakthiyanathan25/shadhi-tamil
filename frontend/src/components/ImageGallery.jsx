import React from "react";

import gallery1 from "../assets/home/gallery1.jpg";
import gallery2 from "../assets/home/gallery2.jpg";
import gallery3 from "../assets/home/gallery3.jpg";
import gallery4 from "../assets/home/gallery4.jpg";

let gallery = [
  { src: gallery1 },
  { src: gallery2 },
  { src: gallery3 },
  { src: gallery4 },
];

const ImageGallery = () => {
  return (
    <div className="w-full grid gap-3 grid-cols-2 pl-5">
     <img src={gallery1} className="w-[350px] mt-10 rounded-md shadow-md shadow-pink-200"/>
     <img src={gallery2} className="w-[350px] mt-20 rounded-md shadow-md shadow-pink-200"/>
     <img src={gallery3} className="w-[350px] -mt-10 rounded-md shadow-md shadow-pink-200" />
     <img src={gallery4} className="w-[350px] mt-1 rounded-md shadow-md shadow-pink-200" />
    </div>
  );
};

export default ImageGallery;
