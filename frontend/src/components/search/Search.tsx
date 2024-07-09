 import './search.scss'
import { ChangeEvent } from 'react';
import './search.scss';

interface SearchProps {
    searchTerm: string;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: () => void;
}

export const Search = ({ searchTerm, onSearchChange, onClearSearch }: SearchProps) => {
    return (
        <form role="search" className='search-form'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
                type="text" 
                className='search-input' 
                placeholder='Я ищу ...' 
                value={searchTerm}
                onChange={onSearchChange}
            />
            {searchTerm && (
                <button type="button" className="clear-button" onClick={onClearSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            )}
        </form>
    );
};