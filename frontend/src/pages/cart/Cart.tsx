import { Link } from 'react-router-dom';
import { Header } from '../../components/header/Header'
import './cart.scss'

export const Cart = () => {

  return (
    <>
        <Header/>
       {(true) ? 
       <div className="title">
          <div className='title_header'>Тут пусто 🙀</div>
          <div className='title_subheader'>Скорее собирать корзину</div>
          <Link to={"/"}>
            <div className='button'>Каталог</div>
          </Link>
        </div> : 
        <div className="full-cart"></div> }
    </>
  )
}

