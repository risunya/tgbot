import { Link } from 'react-router-dom';
import { ThemeButton } from '../themeButton'
import './header.scss'
import { CartImg } from '../cartButton/CartImg';

export const Header = () => {
    return (
        <div className='header'>
            <Link to='/'>
                <div className='header-name'>Атлетика</div>
            </Link>
            <div className='helpers'>
                <ThemeButton/>
                <CartImg/>
            </div>
        </div>
    )
}