import React from 'react';
import './Card.css';

function Card({ item, addItem }) {
  function add() {
    return addItem(item);
  }

  return (
    <div className='container'>
      <div className='imgContainer'>
        <img className='img' alt='item' src={item.img} />
        <button className='addButton' type='button' onClick={add}>
          +
        </button>
      </div>
      <div className='cardContent'>
        <div className='cardHeader'>
          <p className='name'>{item.name}</p>
          <p className='price'>${item.price.toFixed(2)}</p>
        </div>
        <p className='attributes'>
          {item.attributes.map((attribute, index) =>
            index === item.attributes.length - 1 ? attribute : attribute + ', '
          )}
        </p>
      </div>
    </div>
  );
}

export default Card;
