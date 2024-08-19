import React from 'react'
import Brand from "../assets/Logo.png"

import {useNavigate} from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img src={Brand} className='w-44 pt-2 cursor-pointer' onClick={()=> navigate("/")} />
  )
}

export default Logo