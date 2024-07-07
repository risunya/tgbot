import { Link } from 'react-router-dom';
import './header.scss'
import { CartImg } from '../cartButton/CartImg';
import { ThemeButton } from '../themeButton/ThemeButton';

export const Header = () => {
    return (
        <div className='header'>
            <Link to='/'>
                <div className='header-name'>Кроссовки</div>
            </Link>
            <div className='helpers'>
                <ThemeButton/>
                <CartImg/>
            </div>
        </div>
    )
}