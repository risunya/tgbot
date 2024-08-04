import { Link } from "react-router-dom"
import { GoBackButton } from "../../../components/gobackbutton/GoBackButton"
import { ThemeButton } from "../../../components/themeButton/ThemeButton"

export const Shoes = () => {
    return (
       <>
            <div className='intro-menu__header'>
                <GoBackButton />
                <div className="header-caption">Кроссовки</div>
                <ThemeButton />
            </div>
            <div className='intro-menu'>
                <Link to='/atletika/shoes/man'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Мужские</div>
                        <img className="item-pic" src="/item-logos/manshoe.jpg" alt="" />
                    </div>
                </Link>
    
                <Link to='/atletika/shoes/woman'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Женские</div>
                        <img className="item-pic" src="/item-logos/womanshoe.png" alt="" />
                    </div>
                </Link> 
            </div>
       </>
    )
}