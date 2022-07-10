import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="">
      <div className="">
        <h1>Pokemon escaped.</h1>
      </div>
      <Button variant='dark' onClick={handleClick} className='button'>
        <span className='button__span'>Catch another Pokémon</span>
      </Button>
    </div>
  )
}

export default ErrorPage