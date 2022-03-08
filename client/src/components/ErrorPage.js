import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from "react";



const ErrorPage = () => {
 let location = useLocation();
  return (
    <Wrapper className='error_page'>
   <section>
    <h1>ERROR 404</h1>
    <h3>Sorry, the page {location.pathname} you are trying to reach doesn't exist.</h3>
      <Link to='/' className='error-btn'>back home</Link>
    </section>
    </Wrapper>
  )
  }



const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage