import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Card from './Card';
import Cart from './Cart';
import data from './data';
import './App.css';
import logo from './logo.png';
import settings from './settings.svg';
import exit from './exit.svg';

function App() {
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(true);

  const [organic, setOrganic] = React.useState(true);
  const [vegetarian, setVegetarian] = React.useState(true);
  const [glutenfree, setGlutenfree] = React.useState(true);
  const [priceIncreasingOrder, setPriceIncreasingOrder] = React.useState(true);

  useEffect(() => {
    removeNonPreferredItems();
  }, [organic, vegetarian, glutenfree]);

  useEffect(() => {
    sortPriceInIncreasingOrder(priceIncreasingOrder);
  }, [priceIncreasingOrder]);

  function increaseQuantity(item) {
    const index = cart.indexOf(item);
    cart[index].quantity += 1;
  }

  function decreaseQuantity(item) {
    const index = cart.indexOf(item);
    cart[index].quantity -= 1;
    if (index > -1 && cart[index].quantity <= 0) {
      cart[index].quantity = 1;
      cart.splice(index, 1);
    }
  }

  function addItem(item) {
    const index = cart.indexOf(item);
    if (index !== -1) {
      increaseQuantity(item);
      setCart([...cart]);
    } else {
      setCart([...cart, item]);
    }
  }

  function deleteItem(item) {
    decreaseQuantity(item);
    setCart([...cart]);
  }

  function sortPriceInIncreasingOrder(isActive) {
    if (isActive) {
      console.log('hello');
    }
  }

  function removeNonPreferredItems() {
    console.log('removed');
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    setPrefFocused('1', organic);
    setPrefFocused('2', vegetarian);
    setPrefFocused('3', glutenfree);
    setPrefFocused('4', priceIncreasingOrder);
  }

  function setOrg() {
    setPrefFocused('1', !organic);
    setOrganic(!organic);
  }

  function setVeg() {
    setPrefFocused('2', !vegetarian);
    setVegetarian(!vegetarian);
  }

  function setGlutFree() {
    setPrefFocused('3', !glutenfree);
    setGlutenfree(!glutenfree);
  }

  function setPriceInc() {
    setPrefFocused('4', !priceIncreasingOrder);
    setPriceIncreasingOrder(!priceIncreasingOrder);
  }

  function setPrefFocused(id, isActive) {
    if (isActive) {
      document.getElementById(id).classList.add('focused');
    } else {
      document.getElementById(id).classList.remove('focused');
    }
  }

  Modal.setAppElement('#root');

  return (
    <>
      <div className='header'>
        <div className='headerTitle'>
          <img className='logo' alt='logo' src={logo} />
          <p className='title'>Mark's Grocery Store</p>
        </div>
        <div className='headerSettings'>
          <button className='settingsButton' onClick={openModal}>
            <img className='settingsLogo' src={settings} alt='settings' />
          </button>
        </div>
      </div>
      <div className='storeContainer'>
        <div className='cardContainer'>
          {data.map((item, index) => (
            <Card key={index} item={item} addItem={addItem} />
          ))}
        </div>
        <div className='cartContainer'>
          <Cart items={cart} deleteItem={deleteItem} />
        </div>
      </div>
      <footer>
        <div className='footer'>
          <span role='img' className='footerText'>
            Website designed with ❤️ by Mark-Olivier Poulin
          </span>
        </div>
      </footer>
      <Modal
        className='modal'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        contentLabel='settings modal'
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className='modalHeader'>
          <div className='modalTitle'>
            <p className='headerTitle'>Settings</p>
          </div>
          <div className='exitContainer'>
            <button className='exitButton' onClick={closeModal}>
              <img className='exitLogo' src={exit} />
            </button>
          </div>
        </div>
        <div className='preferences'>
          <p className='modalSubHeader'>Preferences</p>
        </div>
        <div className='prefContainer'>
          <button id='1' className='radioButton' onClick={setOrg}>
            Organic
          </button>
          <button id='2' className='radioButton' onClick={setVeg}>
            Vegetarian
          </button>
          <button id='3' className='radioButton' onClick={setGlutFree}>
            Gluten-free
          </button>
          <button id='4' className='radioButton' onClick={setPriceInc}>
            Price in increasing order
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
