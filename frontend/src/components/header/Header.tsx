import { Link, useLocation } from 'react-router-dom';
import './header.scss'
import { CartImg } from '../cartButton/CartImg';
import { ThemeButton } from '../themeButton/ThemeButton';
import { Ham } from './assets/Ham';

export const Header = () => {
    const location = useLocation();
    const getHeaderName = () => {
        switch (location.pathname) {
            case '/atletika':
                return 'Atletika';
            case '/trunner':
                return 'TRunner';
            default:
                return 'Каталог'; // Значение по умолчанию или другие возможные пути
        }
    };
    return (
        <div className='header'>
            <Link to='/'>
            <div className='helpers'>
                <Ham />
            </div>
            </Link>
            <div className='header-name'>{getHeaderName()}</div>
            <div className='helpers'>
                <ThemeButton/>
                <CartImg/>
            </div>
        </div>
    )
}