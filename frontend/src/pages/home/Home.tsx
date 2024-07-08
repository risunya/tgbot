import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import { Search } from '../../components/search/Search';
import { Acordeon } from '../../components/note/Acordeon';

export const Home = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=8EH7iMJwuoCnDaRj2usaAWrADH-M44jxBWVwLkDdrw1-lJLYQ8GvrUGq-sL_fjLQR4k5PfHplgN9kRfAAaq0a2D_Y1a4RHMIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOPj8I7q2499TIq2ooh3bK5bjYY7TU9X0FOciTIu7e1TchrTqRqfUo30z0wPFBLf-KHEkTsxv2bcir5Bk3Oafa95bMDoXG0mGA&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

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

    const preloadImage = (src : any, index : any) => {
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
                preloadImage(item[1], index);
            });
        }
    }, [newData]);

    return (
        <div className='content'>
            <>
                <Acordeon />
                <Search />
                {data && (
                    <div className='item-list'>
                        {newData.map((item: any, index: number) => (
                            <Link to={`/shoes/${index + 1}`} key={index} className='item'>
                                <div className='item-container'>
                                    {!imagesLoaded[index] && <div className='skeleton-image' />}
                                    {imagesLoaded[index] && (
                                        <img
                                            className='item-image'
                                            src={item[1]}
                                            alt={`Изображение товара ${item[0]}`}
                                        />
                                    )}
                                </div>
                                <div className='price'>
                                    <div className='new-price'>{item[23]}₽</div>
                                    <div className='old-price'>{Math.round(item[23] * 1.1)}₽</div>
                                </div>
                                <div className='item-info'>{item[0]} ({item[2]})</div>
                            </Link>
                        ))}
                    </div>
                )}
            </>
            {loading ? (
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            ) : null}
        </div>
    );
};
