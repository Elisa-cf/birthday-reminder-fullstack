import React from 'react';
import styled from 'styled-components'


const Button = ({color, text, onClick}) => {
 return <StyledButton onClick={onClick}
  style={{ backgroundColor: color, marginBottom: "20px"}}
  >
  {text}
 </StyledButton>
};

const StyledButton = styled.button`
  display: flex;
  justify-content: flex-end;
  background: #ff4154;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.2rem;
`

export default Button;
