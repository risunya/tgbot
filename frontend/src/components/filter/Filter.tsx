import { useState } from 'react';
import './filter.scss';

interface FilterProps {
    FilterIndex: number;
}

export const Filter = ({ FilterIndex }: FilterProps) => {
    const [isOpened, setOpen] = useState(false);
    const [isOpenedSize, setIsOpenedSize] = useState(false);
    const [isOpenedBrand, setIsOpenedBrand] = useState(false);
    const [isOpenedPrice, setIsOpenedPrice] = useState(false);

    const toggleSizePopup = () => {
        setIsOpenedSize(true);
        setIsOpenedBrand(false);
        setIsOpenedPrice(false);
        setOpen(true);
    };

    const toggleBrandPopup = () => {
        setIsOpenedSize(false);
        setIsOpenedBrand(true);
        setIsOpenedPrice(false);
        setOpen(true);
    };

    const togglePricePopup = () => {
        setIsOpenedSize(false);
        setIsOpenedBrand(false);
        setIsOpenedPrice(true);
        setOpen(true);
    };

    const closePopup = () => {
        setOpen(false);
        setTimeout(() => {
            setIsOpenedSize(false);
            setIsOpenedBrand(false);
            setIsOpenedPrice(false);
        }, 600); // Timeout matches the animation duration
    };

    return (
        <>
            <div className="filter-wrapper">
                <div className="found-number">Мы нашли {FilterIndex} товаров</div>
                <div className="sort-list">
                    <div className="sort-item" onClick={toggleSizePopup}>Размер</div>
                    <div className="sort-item" onClick={toggleBrandPopup}>Бренд</div>
                    <div className="sort-item" onClick={togglePricePopup}>Цена</div>
                </div>
            </div>
            <div className={`popup size-popup ${isOpened && isOpenedSize ? 'active-popup' : ''}`}>
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
            <div className={`popup brand-popup ${isOpened && isOpenedBrand ? 'active-popup' : ''}`}>
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
            <div className={`popup price-popup ${isOpened && isOpenedPrice ? 'active-popup' : ''}`}>
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
        </>
    );
}