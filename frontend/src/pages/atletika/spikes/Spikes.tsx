import { Link } from "react-router-dom"

export const Spikes = () => {
    return (
       <>
            <div className='intro-menu__header'>
                <div className="header-caption">Шиповки</div>
            </div>
            <div className='intro-menu'>
                <Link to='/atletika/spikes/sprint'>
                    <div className='intro-menu__item'>
                        <div className="item-name">Спринт</div>
                        <img className="item-pic" src="/item-logos/sprint.jpg" alt="" />
                    </div>
                </Link>
    
                <Link to='/atletika/spikes/middle'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Средние дистанции</div>
                        <img className="item-pic" src="/item-logos/middle.jpg" alt="" />
                    </div>
                </Link> 

                <Link to='/atletika/spikes/tech'> 
                    <div className='intro-menu__item'>
                        <div className="item-name">Технические виды</div>
                        <img className="item-pic" src="/item-logos/tech.jpg" alt="" />
                    </div>
                </Link> 
            </div>
       </>
    )
}