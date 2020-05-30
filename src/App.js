import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Card from './Card';
import Cart from './Cart';
import data from './data';
import './App.css';
import logo from './logo.png';
import settings from './settings.svg';
import exit from './exit.svg';
import arrow from './arrow.svg';

function App() {
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [categories, setCategories] = React.useState(data);

  const [organic, setOrganic] = React.useState(true);
  const [vegetarian, setVegetarian] = React.useState(true);
  const [glutenfree, setGlutenfree] = React.useState(true);

  const [priceIncreasingOrder, setPriceIncreasingOrder] = React.useState(true);
  const [priceDecreasingOrder, setPriceDecreasingOrder] = React.useState(false);

  useEffect(() => {
    removeNonPreferredItems();
  }, [organic, vegetarian, glutenfree]);

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

  function sortPriceInIncreasingOrder(data) {
    let incData = [];
    for (const items of data) {
      const incItems = items.sort(function (a, b) {
        return a.price - b.price;
      });
      incData.push(incItems);
    }
    return data;
  }

  function sortPriceInDecreasingOrder(data) {
    let decData = [];
    for (const items of data) {
      const decItems = items.sort(function (a, b) {
        return b.price - a.price;
      });
      decData.push(decItems);
    }
    return data;
  }

  function removeNonPreferredItems() {
    const attributes = {
      Orgarnic: organic,
      Vegetarian: vegetarian,
      Glutenfree: glutenfree,
    };

    let count = 0;
    let result = [];

    for (const category of data) {
      let itemsToKeep = [];
      for (const item of category) {
        let attributesLength = item.attributes.length;
        for (let attribute of item.attributes) {
          attribute = attribute.replace('-', '');
          if (!attributes[attribute]) {
            break;
          } else {
            count++;
          }
          if (count === attributesLength) {
            itemsToKeep.push(item);
          }
        }
        count = 0;
      }
      result.push(itemsToKeep);
    }

    if (priceIncreasingOrder) {
      result = sortPriceInIncreasingOrder(result);
    } else {
      result = sortPriceInDecreasingOrder(result);
    }
    setCategories(result);
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
    setPrefFocused('5', priceDecreasingOrder);
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
    setPrefFocused('5', false);
    setPrefFocused('4', true);
    setPriceDecreasingOrder(false);
    setPriceIncreasingOrder(true);
    setCategories(sortPriceInIncreasingOrder(categories));
  }

  function setPriceDec() {
    setPrefFocused('4', false);
    setPrefFocused('5', true);
    setPriceIncreasingOrder(false);
    setPriceDecreasingOrder(true);
    setCategories(sortPriceInDecreasingOrder(categories));
  }

  function toggleCategory(event) {
    const childNodes = event.target.parentNode.childNodes;

    if (childNodes[2].classList.contains('hidden')) {
      childNodes[2].classList.remove('hidden');
      childNodes[1].classList.add('hidden');
      childNodes[0].children[0].classList.add('categoryIsOpen');
    } else {
      childNodes[2].classList.add('hidden');
      childNodes[1].classList.remove('hidden');
      childNodes[0].children[0].classList.remove('categoryIsOpen');
    }
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
        <div className='itemsContainer'>
          {categories.map((category, categoryIndex) => (
            <>
              {category.length !== 0 && (
                <div key={categoryIndex} className='category'>
                  <div className='categoryHeader' onClick={toggleCategory}>
                    <img
                      className={`arrowIcon ${
                        categoryIndex === 0 ? 'categoryIsOpen' : ''
                      }`}
                      alt='logo'
                      src={arrow}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <p
                      className='categoryTitle'
                      onClick={(e) => e.stopPropagation()}
                    >
                      {category[0].category}
                    </p>
                  </div>
                  {categoryIndex + 1 !== categories.length ? (
                    <div
                      className={`separator ${
                        categoryIndex === 0 ? 'hidden' : ''
                      }`}
                    />
                  ) : (
                    <div />
                  )}
                  <div
                    className={`categoryCards ${
                      categoryIndex === 0 ? '' : 'hidden'
                    }`}
                  >
                    {category.map((item, cardIndex) => (
                      <Card key={cardIndex} item={item} addItem={addItem} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div className='cartContainer'>
          <Cart items={cart} deleteItem={deleteItem} />
        </div>
      </div>
      <footer>
        <div className='footer'>
          <span role='img' className='footerText'>
            Website built & designed with ❤️ by Mark-Olivier Poulin
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
          <p className='modalSubHeader'>Tell us about your preferences!</p>
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
          <button id='5' className='radioButton' onClick={setPriceDec}>
            Price in decreasing order
          </button>
        </div>
        <div className='helpMessage'>
          * blue means that the button is slected
        </div>
      </Modal>
    </>
  );
}

export default App;
