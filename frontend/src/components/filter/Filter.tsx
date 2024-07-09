import { useState, useRef, useEffect } from 'react';
import './filter.scss';
interface FilterProps {
    FilterIndex: number;
}
export const Filter = ({FilterIndex}: FilterProps) => {
    const [isOpened, setOpen] = useState(false);
    const [isOpenedSize, setIsOpenedSize] = useState(false);
    const [isOpenedBrand, setIsOpenedBrand] = useState(false);
    const [isOpenedPrice, setIsOpenedPrice] = useState(false);

    const sizePanelRef = useRef<HTMLDivElement>(null);
    const brandPanelRef = useRef<HTMLDivElement>(null);
    const pricePanelRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = useState(0);

    useEffect(() => {
        if (isOpenedSize && sizePanelRef.current) {
            setPanelHeight(sizePanelRef.current.scrollHeight);
        }
        if (isOpenedBrand && brandPanelRef.current) {
            setPanelHeight(brandPanelRef.current.scrollHeight);
        }
        if (isOpenedPrice && pricePanelRef.current) {
            setPanelHeight(pricePanelRef.current.scrollHeight);
        }
    }, [isOpenedSize, isOpenedBrand, isOpenedPrice]);

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
            <div
                ref={sizePanelRef}
                className={`popup size-popup ${isOpened && isOpenedSize ? 'active-popup' : ''}`}
                style={{ maxHeight: isOpened && isOpenedSize ? `${panelHeight}px` : '0' }}
            >
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>CLOSE POPUP</div>
            </div>
            <div
                ref={brandPanelRef}
                className={`popup brand-popup ${isOpened && isOpenedBrand ? 'active-popup' : ''}`}
                style={{ maxHeight: isOpened && isOpenedBrand ? `${panelHeight}px` : '0' }}
            >
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>CLOSE POPUP</div>
            </div>
            <div
                ref={pricePanelRef}
                className={`popup price-popup ${isOpened && isOpenedPrice ? 'active-popup' : ''}`}
                style={{ maxHeight: isOpened && isOpenedPrice ? `${panelHeight}px` : '0' }}
            >
                <div className='filter-properties'></div>
                <div onClick={closePopup} className='close-popup'>CLOSE POPUP</div>
            </div>
        </>
    );
}
