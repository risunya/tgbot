import './home.scss';
import { Accordion } from '../accordion/Accordion';
import { ItemList } from '../item-list/ItemList';
import { Header } from '../header/Header';

interface MyButtonProps {
    /** The text to display inside the button */
    kind: string;
    /** Whether the button can be interacted with */
    sex: string;
}

export const Home = ({ kind, sex }: MyButtonProps) => {
   
    return (
       <>
        <Header/>
        <div className='content'>
            <>
                <Accordion />
                <ItemList 
                kind={kind}
                sex={sex}
                />
            </>
        </div>
       </>
    );
};
