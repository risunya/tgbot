import { Link } from 'react-router-dom';
import './cart.scss';
import { useState, useEffect } from 'react';

export const Cart = ({isCartActive} : any) => {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
});

  useEffect(() => {
    // Обновляем корзину в localStorage при каждом изменении состояния cart
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (index: number) => {
    // Клонируем текущий массив cart
    const updatedCart = [...cart];

    // Удаляем элемент под указанным индексом, если он существует
    if (index >= 0 && index < updatedCart.length) {
      updatedCart.splice(index, 1);
    }

    // Обновляем состояние корзины
    setCart(updatedCart);
  };

  const listItems = cart.map((cartitem : any, index : any) =>
    <div className='cart-item' key={index}>
      <div className="cart-item__pic-wrapper">
        <img className="cart-item__pic" src={cartitem[5]} alt="" />
      </div>
      <div className="cart-item__info">
        <div className="cart-item__name" style={{fontWeight: '700'}}>{cartitem[3]}</div>
        <div className="cart-item__name" style={{fontWeight: '700'}}>({cartitem[4]})</div>
        <div className="cart-item__name" style={{fontWeight: '500'}}>{cartitem[26]} руб.</div>
      </div>
      <button className='cart-item-button'
        onClick={() => removeFromCart(index)}
      >Х</button>
    </div>
  );
  
  return (
    <div className={`cart-wrapper ${isCartActive ? "active" : ""}`}>
      {cart.length === 0 ? 
        <div className="title">
          <div className='title_header'>Тут пусто 🙀</div>
          <div className='title_subheader'>Скорее собирать корзину</div>
          <Link to={"/"}>
            <div className='button'>Каталог</div>
          </Link>
        </div> : 
        <div className="full-cart">
          {listItems}
          <button className='write-cart-button'>
            <a href="https://t.me/Alyoshkin_Sergey">Написать менеджеру</a>
          </button>
        </div> 
      }
    </div>
  );
};
