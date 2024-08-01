import { Link } from "react-router-dom"

export const Equipment = () => {
    return (
       <>
            <div className='intro-menu__header'>
                <div className="header-caption">Экипировка</div>
            </div>
            <div className='intro-menu'>
                <Link to='/atletika/equipment/man'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Мужская</div>
                        <img className="item-pic" src="/item-logos/manequipment.jpeg" alt="" />
                    </div>
                </Link>
    
                <Link to='/atletika/equipment/woman'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Женская</div>
                        <img className="item-pic" src="/item-logos/womanequipment.jpg" alt="" />
                    </div>
                </Link> 

                <Link to='/atletika/equipment/accessories'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Аксессуары</div>
                        <img className="item-pic" src="/item-logos/access.jpg" alt="" />
                    </div>
                </Link> 
            </div>
       </>
    )
}