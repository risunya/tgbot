// ItemList.tsx
import './itemlist.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { Search } from '../../components/search/Search';
import { Filter } from '../filter/Filter';

export const ItemList = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
    const [uniqueBrands, setUniqueBrands] = useState<{ brand: string, count: number }[]>([]);
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
                console.log('Полученные данные:', jsonData); // Добавлено отладочное сообщение
                setData(jsonData.result);
                setImagesLoaded(new Array(jsonData.result.length).fill(false));
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 0);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            const newData = data.slice(1);
            setFilteredData(newData);

            // Extract unique sizes and brands
            const sizesSet = new Set<string>();
            const brandsCount: { [key: string]: number } = {};

            newData.forEach((item: any) => {
                sizesSet.add(item[2]); // Assuming size is at index 2
                const brand = item[1]; // Assuming brand is at index 1
                if (brandsCount[brand]) {
                    brandsCount[brand]++;
                } else {
                    brandsCount[brand] = 1;
                }
            });

            setUniqueSizes(Array.from(sizesSet));
            setUniqueBrands(Object.entries(brandsCount).map(([brand, count]) => ({ brand, count })));
        }
    }, [data]);

    useEffect(() => {
        const sortedData = [...filteredData].sort((a, b) => {
            const priceA = parseFloat(a[24]); // Assuming price is at index 24
            const priceB = parseFloat(b[24]);
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

    const handleFilter = (sizeFilter: string[], brandFilter: string[], sort: 'asc' | 'desc') => {
        setSortOrder(sort);
        let filtered = data.slice(1);

        if (sizeFilter.length > 0) {
            filtered = filtered.filter(item => sizeFilter.includes(item[2]));
        }

        if (brandFilter.length > 0) {
            filtered = filtered.filter(item => brandFilter.includes(item[1]));
        }

        setFilteredData(filtered);
    };

    const preloadImage = (src: any, index: any) => {
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
                preloadImage(item[3], index);
            });
        }
    }, [filteredData]);

    const filteredSearchData = filteredData.filter((item: any) =>
        item[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[1].toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <>
            {loading ? <Loader /> : null}
            {data && (
                <>
                    <Search
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        onClearSearch={clearSearch}
                    />
                    <Filter
                        FilterIndex={filteredSearchData.length}
                        sizes={uniqueSizes}
                        brands={uniqueBrands}
                        onFilter={handleFilter}
                    />
                    <div className='item-list'>
                        {filteredSearchData.map((item: any, index: number) => (
                            <Link to={`/shoes/${index + 1}`} key={index} className='item'>
                                <div className='item-container'>
                                    {!imagesLoaded[index] && <div className='skeleton-image' />}
                                    {imagesLoaded[index] && (
                                        <img
                                            className='item-image'
                                            src={item[3]}
                                            alt={`Изображение товара ${item[1]}`}
                                        />
                                    )}
                                </div>
                                <div className='price'>
                                    <div className='new-price'>{item[24]}₽</div>
                                    <div className='old-price'>{Math.round(item[24] * 1.1)}₽</div>
                                </div>
                                <div className='item-info'>{item[0]} {item[1]} ({item[2]})</div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
