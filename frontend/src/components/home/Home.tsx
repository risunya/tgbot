import './home.scss';
import { Accordion } from '../accordion/Accordion';
import { ItemList } from '../item-list/ItemList';
import { Header } from '../header/Header';

export const Home = () => {
   
    return (
       <>
        <Header/>
        <div className='content'>
            <>
                <Accordion />
                <ItemList />
            </>
        </div>
       </>
    );
};
