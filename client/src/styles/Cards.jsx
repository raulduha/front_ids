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
              src='/acm.jpg'
              text='ACM'
              label='Fabricas'
              
            />
            <CardItem
              src='/datafusion.png'
              text='logo datafusion'
              label='datafusion'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/fabrica.avif'
              text='fabrica foto ejemplo 3'
              label='Technology'
              
            />
            <CardItem
              src='/falus.jpg'
              text='Maquina Falus'
              label='Maquinas'
              
            />
            <CardItem
              src='/prensados.jpg'
              text='Maquina prensados'
              label='Maquina'
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
