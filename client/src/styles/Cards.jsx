import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 style={{ color: '#fff' }}></h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/fabrica.avif'
              text='fabrica foto ejemplo 1'
              label='Fabricas'
              
            />
            <CardItem
              src='/datafusion.png'
              text='fabrica foto ejemplo 2'
              label='Fabricas'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/fabrica.avif'
              text='fabrica foto ejemplo 3'
              label='Technology'
              
            />
            <CardItem
              src='/fabrica.avif'
              text='fabrica foto ejemplo 3'
              label='Fabricas'
              
            />
            <CardItem
              src='/fabrica.avif'
              text='fabrica foto ejemplo 5'
              label='Fabricas'
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
