import { useState } from 'react';
import './cartbutton.scss';
import { Cart } from '../../pages/cart/Cart';

export const CartImg = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);

  const handleCartClick = () => {
    setIsOpenCart(prev => !prev);
  };

  return (
    <>
      <div className='cart-button' onClick={handleCartClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="helper-button">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
      {isOpenCart && <Cart isCartActive={isOpenCart} />}
    </>
  );
};
