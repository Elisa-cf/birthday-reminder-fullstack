import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { social } from '../data';
import styled from 'styled-components'


const Navbar = () => {
 const [showLinks, setShowLinks] = useState(false);
 const linksContainerRef = useRef(null);
 const linksRef = useRef(null);
 const toggleLinks = () => {
  setShowLinks(!showLinks);
 };
 useEffect(() => {
  const linksHeight = linksRef.current.getBoundingClientRect().height;
  if (showLinks) {
   linksContainerRef.current.style.height = `${linksHeight}px`;
  } else {
   linksContainerRef.current.style.height = '0px';
  }
 }, [showLinks]);
 return (
  <nav>
   <div className='nav-center'>
    <div className='nav-header'>
     <a href='/'><StyledLogo>Full-Stack App</StyledLogo></a>
     <button className='nav-toggle' onClick={toggleLinks}>
      <FaBars />
     </button>
    </div>
       <div className='links-container' ref={linksContainerRef}>
         <ul className='links' ref={linksRef}>
           <li>
             <a href={'/'}>Home</a>
           </li>
           <li>
             <a href={'https://elisa-canyelles-portfolio.netlify.app/'} target="_blank">About Me</a>
           </li>
           <li>
             <a href={'https://elisa-canyelles-portfolio.netlify.app/#work'} target="_blank">Other Projects</a>
           </li>
         </ul>
       </div>  
  <ul className='social-icons'>
     {social.map((socialIcon) => {
      const { id, url, icon } = socialIcon;
      return (
       <li key={id}>
        <a href={url} target="_blank">{icon}</a>
       </li>
      );
     })}
    </ul>
   </div>  
  </nav>
 );
};

const StyledLogo = styled.h4`
color: #13795b;
`

export default Navbar;
