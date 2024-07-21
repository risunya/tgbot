import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './itempage.scss';

export const ItemPage = () => {
    const { itemnumber } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=d90MFXtmuW3izfepKfq7ZfiPRyCxr2vldRQYJ27qcoUZaMHQhwQViqcnhOVO1HlAFjB4I1vwrXZ5QzkeLCGzV8IQqgdBXFUWm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOxQImybUPuS6gyOh04-ChOeoLqomWZiVh4nbMH2jGLztWY58bMJ5DdljgQhm1tYyqp3CBAJDDp_qPpfSoylfD5JQhe5m9S1qg&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                console.log('Полученные данные:', jsonData);
                const item = itemnumber !== undefined ? jsonData.result[itemnumber] : null;
                console.log('Найденный товар:', item);
                setItemData(item);
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemData();
    }, [itemnumber]);

    if (loading) {
        return <div className="loader-container">
                    <div className="loader"></div>
                </div>;
    }

    if (!itemData) {
        return <div>Ой, мы не нашли эту вещь!</div>;
    }

    return (
        <>
            <div className='item-detail'>
                <div className='item-container'>
                    <Link  to='/home'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </Link>
                    <img className='item-image' src={itemData[3]} alt={`Изображение товара ${itemData[1]}`} />
                </div>
                <div className='item-info'>{itemData[0]} {itemData[1]} ({itemData[2]})</div>
                <div className='sizes-container '>
                    <div className='sizes'>
                        {
                            [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31].map((size, index) => {
                                const value = itemData[index + 3];
                                return value ? <div className='round-size' key={index}>{size}</div> : null;
                            })
                        }
                    </div>
                </div>
                <div className='article-container'>
                    <div className='article-name'>Описание:</div>
                    <div className='article'>{itemData[25]}</div>
                </div>
            </div>
            <div className='price-container'>
                    <div className='price'>
                        <div className='new-price'>Цена: {itemData[24]}₽</div>
                        <div className='old-price'>{Math.round(itemData[24] * 1.1)}₽</div>
                    </div>
            </div>
        </>
    );
};
