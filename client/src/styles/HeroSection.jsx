import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/datafusion.png' alt='Home' style={{ width: '1000px' }} />
      <h1 style={{ color: '#fff' }}></h1>
      <p style={{ color: '#fff' }}></p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          style={{ color: '#fff', borderColor: '#fff' }}
          
        >
          Registrate

        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;
