import { Link } from 'react-router-dom'
import './menu.scss'
export const Menu = () => {
    return (
        <>
            <div className='intro-menu__header'>
                <div className="header-caption">Каталог</div>
            </div>
            <div className='intro-menu'>
                <Link to='/atletika'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Atletika Shop</div>
                        <img className="item-pic" src="./shop-logos/atletika.jpg" alt="" />
                    </div>
                </Link>
    
                {/* <Link to='/trunner'> */} 
                    <div className='intro-menu__item disabled'>
                        <div className="item-name">TRunner Gang</div>
                        <img className="item-pic" src="./shop-logos/trunner.jpg" alt="" />
                    </div>
                {/* </Link> */} 
                <div className='intro-menu__item disabled'>
                    <div className="item-name">sPort Shop</div>
                    <img className="item-pic" src="./shop-logos/p-logo.jpg" alt="" />
                </div>
            </div>
        </>
    )
}