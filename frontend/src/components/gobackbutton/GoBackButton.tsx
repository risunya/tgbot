import { Link, useLocation } from "react-router-dom";
import { Ham } from "../header/assets/Ham";

export const GoBackButton = () => {
    const location = useLocation();
    const getBackLink = () => {
        const pathParts = location.pathname.split('/').filter(part => part);
        if (pathParts.length >= 1) {
            pathParts.pop(); // Удаляем последний элемент
        }
        return '/' + pathParts.join('/');
    };
    return (
        <Link to={getBackLink()}>
            <div className='helpers'>
            <Ham />
            </div>
        </Link>
            
    )
}