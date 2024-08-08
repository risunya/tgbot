import { Link } from "react-router-dom"
import { GoBackButton } from "../../../components/gobackbutton/GoBackButton"
import { ThemeButton } from "../../../components/themeButton/ThemeButton"
import { CartImg } from "../../../components/cartButton/CartImg"

export const Spikes = () => {
    return (
       <>
            <div className='intro-menu__header'>
                <GoBackButton />
                <div className="header-caption">Шиповки</div>
                <div className='header-buttons'>
                    <ThemeButton />
                    <CartImg />
                </div>
            </div>
            <div className='intro-menu'>
                <Link to='/atletika/spikes/sprint'>
                    <div className='intro-menu__item'>
                        <div className="item-name" style={{fontSize:"22px"}}>Спринт</div>
                        <img className="item-pic" src="/item-logos/sprint.jpg" alt="" />
                    </div>
                </Link>
    
                <Link to='/atletika/spikes/middle'> 
                    <div className='intro-menu__item'>
                        <div className="item-name" style={{fontSize:"22px"}}>Средние дистанции</div>
                        <img className="item-pic" src="/item-logos/middle.jpg" alt="" />
                    </div>
                </Link> 

                <Link to='/atletika/spikes/tech'> 
                    <div className='intro-menu__item'>
                        <div className="item-name" style={{fontSize:"22px"}}>Технические виды</div>
                        <img className="item-pic" src="/item-logos/tech.jpg" alt="" />
                    </div>
                </Link> 
            </div>
       </>
    )
}