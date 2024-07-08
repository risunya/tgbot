import './home.scss';
import { Accordion } from '../../components/accordion/Accordion';
import { ItemList } from '../../components/item-list/ItemList';

export const Home = () => {
   
    return (
        <div className='content'>
            <>
                <Accordion />
                <ItemList />
            </>
        </div>
    );
};
