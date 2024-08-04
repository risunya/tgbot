import './header.scss'
import { CartImg } from '../cartButton/CartImg';
import { ThemeButton } from '../themeButton/ThemeButton';
import { useLocation } from 'react-router-dom';
import { GoBackButton } from '../gobackbutton/GoBackButton';


export const Header = () => {
    const location = useLocation();
    let kind = '';
    let sex = '';
    const getItemInfo = () => {
        
        if (location.pathname.includes('shoes')) {
          kind = 'Кроссовки';
        } else if ((location.pathname.includes('spikes'))) {
          kind = 'Шиповки';
        } else  if ((location.pathname.includes('equipment'))){
            kind = 'Экипировка';
        } else {
            kind = '';
        }
        if (location.pathname.includes('/man')) {
            sex = '(муж)';
          } else if (location.pathname.includes('/woman')) {
            sex = '(жен)';
          } else if (location.pathname.includes('/tech')) {
            sex = '(тех)';
          } else if (location.pathname.includes('/middle')) {
            sex = '(средние)';
          } else if (location.pathname.includes('/sprint')) {
            sex = '(спринт)';
          } else if (location.pathname.includes('/accessories')) {
            sex = '(аксессуары)';
        }
}
getItemInfo();
    return (
        <div className='header'>
            <GoBackButton />
            <div className='header-name'>{kind} {sex}</div>
            <div className='helpers'>
                <ThemeButton/>
                <CartImg/>
            </div>
        </div>
    )
}