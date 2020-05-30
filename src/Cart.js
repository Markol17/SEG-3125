import React from 'react';
import './Cart.css';
import deleteIcon from './delete.svg';

function Cart({ items, deleteItem }) {
  function getTotal() {
    let total = 0;

    items.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  }

  return (
    <div className='cart'>
      <div className='cartHeader'>
        <p className='headerTitle'>Cart</p>
      </div>
      <div className='cartItemsContainer'>
        {items.length === 0 && (
          <div className='noItemContainer'>
            <p className='emptyMessage'>Your cart is currently empty! </p>
          </div>
        )}
        {items.map((item, index) => (
          <div key={index} className='cartItem'>
            <p className='name'>
              {item.name}
              {item.quantity > 1 ? ' x ' + item.quantity : null}
            </p>
            <div className='itemRight'>
              <p className='price'>${item.price.toFixed(2)}</p>
              <button
                className='delButton'
                type='button'
                onClick={() => deleteItem(item)} //I know this is not the best for optimization but it'll do for this time lol
              >
                <img className='deleteIcon' src={deleteIcon} alt='deleteIcon' />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='cartFooter'>
        <p className='cartTotal'>Total:</p>
        <p className='cartTotalAmount'>${getTotal()}</p>
      </div>
      <button
        className={`payButton ${items.length === 0 ? 'disabledPay' : ''}`}
        type='button'
        disabled={items.length === 0}
        onClick={() => {
          alert('The payout page is under construction');
        }}
      >
        Pay
      </button>
    </div>
  );
}

export default Cart;
