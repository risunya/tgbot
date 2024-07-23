import { Link } from "react-router-dom"

export const AtletikaMenu = () => {
    return (
        <>
            <div className='intro-menu__header'>
                <div className="header-caption">Atletika</div>
            </div>
            <div className='intro-menu'>
                <Link to='/atletika/shoes'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Кроссовки</div>
                        <img className="item-pic" src="/item-logos/shoe.jpg" alt="" />
                    </div>
                </Link>

                <Link to='/atletika/spikes'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Шиповки</div>
                        <img className="item-pic" src="/item-logos/spikes.jpg" alt="" />
                    </div>
                </Link> 

                <Link to='/atletika/equipment'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Экипировка</div>
                        <img className="item-pic" src="/item-logos/equipment.jpg" alt="" />
                    </div>
                </Link>
                
            </div>
        </>
    )
}