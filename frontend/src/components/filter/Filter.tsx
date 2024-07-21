// Filter.tsx
import { useState } from 'react';
import './filter.scss';

interface FilterProps {
    FilterIndex: number;
    sizes: string[];
    brands: { brand: string, count: number }[];
    onFilter: (sizeFilter: string[], brandFilter: string[], sort: 'asc' | 'desc') => void;
}

export const Filter = ({ FilterIndex, sizes, brands, onFilter }: FilterProps) => {
    const [isOpened, setOpen] = useState(false);
    const [isOpenedSize, setIsOpenedSize] = useState(false);
    const [isOpenedBrand, setIsOpenedBrand] = useState(false);
    const [isOpenedPrice, setIsOpenedPrice] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

    const handleSizeChange = (size: string) => {
        setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand)         : [...prev, brand]);
    };

    const applyFilters = () => {
        onFilter(selectedSizes, selectedBrands, sortOrder);
        closePopup();
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        onFilter(selectedSizes, selectedBrands, order);
        closePopup();
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
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Размер</div>
                    <div className="filter-items">
                        {sizes.map((size, index) => (
                            <div
                                key={index}
                                className={`filter-item ${selectedSizes.includes(size) ? 'selected' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
            <div className={`popup brand-popup ${isOpened && isOpenedBrand ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Бренд</div>
                    <div className="filter-items">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className={`filter-item ${selectedBrands.includes(brand.brand) ? 'selected' : ''}`}
                                onClick={() => handleBrandChange(brand.brand)}
                            >
                                {brand.brand} ({brand.count})
                            </div>
                        ))}
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
            <div className={`popup price-popup ${isOpened && isOpenedPrice ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Цена</div>
                    <div className="filter-items">
                        <div
                            className={`filter-item ${sortOrder === 'asc' ? 'selected' : ''}`}
                            onClick={() => handleSortChange('asc')}
                        >
                            По возрастанию
                        </div>
                        <div
                            className={`filter-item ${sortOrder === 'desc' ? 'selected' : ''}`}
                            onClick={() => handleSortChange('desc')}
                        >
                            По убыванию
                        </div>
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <img src="./close.svg" alt="Close" />
                </div>
            </div>
        </>
    );
};
