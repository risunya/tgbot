import { useState } from 'react';
import './filter.scss';
import { CloseButton } from './CloseButton';

interface FilterProps {
    FilterIndex: number;
    sizes: { [size: number]: number }; // Изменено с string на number
    brands: { brand: string, count: number }[];
    models: { model: string, count: number }[];
    onFilter: (sizeFilter: number[], brandFilter: string[], modelFilter: string[], sort: 'asc' | 'desc') => void; // Изменено с string[] на number[]
}

export const Filter = ({ FilterIndex, sizes, brands, models, onFilter }: FilterProps) => {
    const [isOpened, setOpen] = useState(false);
    const [isOpenedSize, setIsOpenedSize] = useState(false);
    const [isOpenedBrand, setIsOpenedBrand] = useState(false);
    const [isOpenedModel, setIsOpenedModel] = useState(false);
    const [isOpenedPrice, setIsOpenedPrice] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]); // Изменено с string[] на number[]
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [sortOrderChecked, setSortOrderChecked] = useState<'asc' | 'desc'>('asc');

    const togglePopup = (type: string) => {
        setIsOpenedSize(type === 'size');
        setIsOpenedBrand(type === 'brand');
        setIsOpenedModel(type === 'model');
        setIsOpenedPrice(type === 'price');
        setOpen(true);
    };

    const closePopup = () => {
        setOpen(false);
        setTimeout(() => {
            setIsOpenedSize(false);
            setIsOpenedBrand(false);
            setIsOpenedModel(false);
            setIsOpenedPrice(false);
        }, 600); // Timeout matches the animation duration
    };

    const handleSizeChange = (size: number) => { // Изменено с string на number
        setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const handleModelChange = (model: string) => {
        setSelectedModels(prev => prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]);
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrderChecked(order);
    };

    const applyFilters = () => {
        onFilter(selectedSizes, selectedBrands, selectedModels, sortOrderChecked);
        closePopup();
        console.log(`выбранные размеры ${selectedSizes}`)
    };

    const sortedModels = models.slice().sort((a, b) => a.model.localeCompare(b.model));
    
    return (
        <>
            <div className="filter-wrapper">
                <div className="found-number">Мы нашли {FilterIndex} товаров</div>
                <div className="sort-list">
                    <div className="sort-item" onClick={() => togglePopup('size')}>Размер</div>
                    <div className="sort-item" onClick={() => togglePopup('brand')}>Бренд</div>
                    <div className="sort-item" onClick={() => togglePopup('model')}>Модель</div>
                    <div className="sort-item" onClick={() => togglePopup('price')}>Цена</div>
                </div>
            </div>
            <div className={`popup size-popup ${isOpened && isOpenedSize ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Размер</div>
                    <div className="filter-items">
                        {Object.entries(sizes).map(([size]) => ({
                            size: Number(size)
                        })).sort((a, b) => a.size - b.size).map(({size}) => (
                            <div className='item-wrapper' key={size}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    <label
                                     key={size}
                                     className={ `filter-item ${selectedSizes.includes(size) ? 'selected' : ''}`}
                                     onClick={() => handleSizeChange(size)}
                                    >
                                    {size} см
                                    </label>
                                </div>
                        ))}
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <CloseButton />
                </div>
            </div>
            <div className={`popup brand-popup ${isOpened && isOpenedBrand ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Бренд</div>
                    <div className="filter-items">
                        {brands.length > 0 ? brands.map((brand, index) => (
                            <div className='item-wrapper' key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand.brand)}
                                        onChange={() => handleBrandChange(brand.brand)}
                                    />
                                    <label
                                    key={index}
                                    className={`filter-item ${selectedBrands.includes(brand.brand) ? 'selected' : ''}`}
                                    onClick={() => handleBrandChange(brand.brand)}
                                    >
                                    {brand.brand} ({brand.count})
                                    </label>
                            </div>
                        )) : <div className='filter-item'>Нет доступных брендов</div>}
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <CloseButton />
                </div>
            </div>
            <div className={`popup model-popup ${isOpened && isOpenedModel ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Модель</div>
                    {
                        <div className="filter-items">
                            {sortedModels.length > 0 ? sortedModels.map((model, index) => (
                                <div className='item-wrapper' key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedModels.includes(model.model)}
                                        onChange={() => handleModelChange(model.model)}
                                    />
                                    <label
                                        key={index}
                                        className={`filter-item ${selectedModels.includes(model.model) ? 'selected' : ''}`}
                                        onClick={() => handleModelChange(model.model)}
                                    >
                                        {model.model} ({model.count})
                                    </label>
                                </div>
                            )) : <div className='filter-item'>Нет доступных моделей</div>}
                        </div>
                    }
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <CloseButton />
                </div>
            </div>
            <div className={`popup price-popup ${isOpened && isOpenedPrice ? 'active-popup' : ''}`}>
                <div className='popup-caption'>Фильтры</div>
                <div className='filter-properties'>
                    <div className='popup-name'>Цена</div>
                    <div className="filter-items">
                        <div className='item-wrapper'>
                            <label
                                className={`filter-item ${sortOrderChecked === 'asc' ? 'selected' : ''}`}
                                onClick={() => handleSortChange('asc')}
                            >
                                <input
                                    type="checkbox"
                                    checked={sortOrderChecked === 'asc'}
                                    onChange={() => handleSortChange('asc')}
                                />
                                По возрастанию
                            </label>
                            <label
                                className={`filter-item ${sortOrderChecked === 'desc' ? 'selected' : ''}`}
                                onClick={() => handleSortChange('desc')}
                            >
                                <input
                                    type="checkbox"
                                    checked={sortOrderChecked === 'desc'}
                                    onChange={() => handleSortChange('desc')}
                                />
                                По убыванию
                            </label>
                        </div>
                    </div>
                    <div className="accept-button" onClick={applyFilters}>Применить</div>
                </div>
                <div onClick={closePopup} className='close-popup'>
                    <CloseButton />
                </div>
            </div>
        </>
    );
};
