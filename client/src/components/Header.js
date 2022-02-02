import React from 'react';
import Button from './Button';

const Header = ({showAdd, onAdd}) => {
  return (<header>
   <h2>Birthday reminder</h2>
    <Button color={showAdd ? "#4ED4AC" : "#4ED4AC"} text={showAdd ? "Hide form" : "Show form"} 
   onClick={onAdd}/>
  </header>)
};

export default Header;
