import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai"

export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
  },
  {
    id: 2,
    url: "/projects",
    text: "other projects",
  },
  {
    id: 3,
    url: "/projects",
    text: "about me",
  },
 
]


export const social =  [ 
  {
   id: 1,
   url: "https://www.linkedin.com/in/elisa-canyelles/",
   icon: <FaLinkedin />,

  }, 

  {
    id: 2,
    url: "https://github.com/Elisa-cf",
    icon: <AiOutlineGithub />,

  }, 

]

