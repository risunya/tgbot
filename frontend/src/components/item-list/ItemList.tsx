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

    const newData = data && Array.isArray(data) ? data.slice(1) : [];

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
        if (newData.length > 0) {
            newData.forEach((item, index) => {
                preloadImage(item[3], index);
            });
        }
    }, [newData]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredData = newData.filter((item: any) =>
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
                    <Filter FilterIndex={filteredData.length}/>
                    <div className='item-list'>
                        {filteredData.map((item: any, index: number) => (
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
