import './itemlist.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { Search } from '../../components/search/Search';
import { Filter } from '../filter/Filter';

interface Item {
    brand: string;
    model: string;
    otherField1: string;
    imageUrl: string;
    sizes: string[];
    price: string;
}

export const ItemList = () => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Item[]>([]);
    const [sizesCount, setSizesCount] = useState<{ [size: string]: number }>({});
    const [uniqueBrands, setUniqueBrands] = useState<{ brand: string, count: number }[]>([]);
    const [uniqueModels, setUniqueModels] = useState<{ model: string, count: number }[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=d90MFXtmuW3izfepKfq7ZfiPRyCxr2vldRQYJ27qcoUZaMHQhwQViqcnhOVO1HlAFjB4I1vwrXZ5QzkeLCGzV8IQqgdBXFUWm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOxQImybUPuS6gyOh04-ChOeoLqomWZiVh4nbMH2jGLztWY58bMJ5DdljgQhm1tYyqp3CBAJDDp_qPpfSoylfD5JQhe5m9S1qg&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                console.log('Полученные данные:', jsonData);
                const items: Item[] = jsonData.result.slice(1).map((item: any) => ({
                    brand: item[0],
                    model: item[1],
                    otherField1: item[2],
                    imageUrl: item[3],
                    sizes: item.slice(4, 23).filter((size: string) => size), // Assuming sizes are from index 4 to 22
                    price: item[24]
                }));
                setData(items);
                setImagesLoaded(new Array(items.length).fill(false));
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setFilteredData(data);

            // Подсчет размеров
            const sizesCount: { [size: string]: number } = {};
            data.forEach((item) => {
                item.sizes.forEach((size) => {
                    sizesCount[size] = (sizesCount[size] || 0) + 1;
                });
            });

            setSizesCount(sizesCount);

            // Подсчет брендов и моделей
            const brandsCount: { [key: string]: number } = {};
            const modelsCount: { [key: string]: number } = {};

            data.forEach((item) => {
                const brand = item.brand;
                const model = item.model;
                brandsCount[brand] = (brandsCount[brand] || 0) + 1;
                modelsCount[model] = (modelsCount[model] || 0) + 1;
            });

            setUniqueBrands(Object.entries(brandsCount).map(([brand, count]) => ({ brand, count })));
            setUniqueModels(Object.entries(modelsCount).map(([model, count]) => ({ model, count })));
        }
    }, [data]);

    useEffect(() => {
        const sortedData = [...filteredData].sort((a, b) => {
            const priceA = parseFloat(a.price); // Assuming price is a string
            const priceB = parseFloat(b.price);
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
        setFilteredData(sortedData);
    }, [sortOrder]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleFilter = (sizeFilter: string[], brandFilter: string[], modelFilter: string[], sort: 'asc' | 'desc') => {
        setSortOrder(sort);
        let filtered = data;

        if (sizeFilter.length > 0) {
            filtered = filtered.filter(item => item.sizes.some(size => sizeFilter.includes(size)));
        }

        if (brandFilter.length > 0) {
            filtered = filtered.filter(item => brandFilter.includes(item.brand));
        }

        if (modelFilter.length > 0) {
            filtered = filtered.filter(item => modelFilter.includes(item.model));
        }

        setFilteredData(filtered);
    };

    const preloadImage = (src: string, index: number) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImagesLoaded((prev) => {
                const newLoaded = [...prev];
                newLoaded[index] = true;
                return newLoaded;
            });
        };
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            filteredData.forEach((item, index) => {
                preloadImage(item.imageUrl, index);
            });
        }
    }, [filteredData]);

    const filteredSearchData = filteredData.filter((item) =>
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {loading ? <Loader /> : null}
            {data.length > 0 && (
                <>
                    <Search
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        onClearSearch={clearSearch}
                    />
                    <Filter
                        FilterIndex={filteredSearchData.length}
                        sizes={sizesCount}
                        brands={uniqueBrands}
                        models={uniqueModels}
                        onFilter={handleFilter}
                    />
                    <div className='item-list'>
                        {filteredSearchData.map((item, index) => (
                            <Link to={`/shoes/${index + 1}`} key={index} className='item'>
                                <div className='item-container'>
                                    {!imagesLoaded[index] && <div className='skeleton-image' />}
                                    {imagesLoaded[index] && (
                                        <img
                                            className='item-image'
                                            src={item.imageUrl}
                                            alt={`Изображение товара ${item.model}`}
                                        />
                                    )}
                                </div>
                                <div className='price'>
                                    <div className='new-price'>{item.price}₽</div>
                                    <div className='old-price'>{Math.round(parseFloat(item.price) * 1.1)}₽</div>
                                </div>
                                <div className='item-info'>{item.brand} {item.model} ({item.otherField1})</div>
                                
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
