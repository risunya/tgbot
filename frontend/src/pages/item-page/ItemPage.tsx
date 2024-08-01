import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './itempage.scss';

export const ItemPage = () => {
    const { itemnumber } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=9GuvFQTH6RQvr1B0-9A4rWHyTjbBEu7Zd0Jz9zv2j4pDmsCCz0XjGKgqIVwxElRmaoGjxjUTgbEecuXbUV1oiRY_EG2AwoBtm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP8NHA8r3pmRSryoK9XShm2ojz6k2Z5-RK0K2Ak2Iemo40QgIqFlE1XWQ0DVdOGNTfEnDeE1CSpPiYHeFny96zSbpa9854WQ4A&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                console.log('Полученные данные:', jsonData);
                const item = itemnumber !== undefined ? jsonData.result.slice(1)[itemnumber] : null;
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

    const sizes = [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31];

    const displayedSizes = sizes.map((size, index) => {
        // Индекс в itemData соответствует текущему индексу + 6
        const value = itemData[index + 6];
        // Если значение существует и не пустое, отображаем размер
        return value && value !== '' ? <div className='round-size' key={size}>{size}</div> : null;
    });


    return (
        <>
            <div className='item-detail'>
                <div className='item-container'>
                    <Link  to='/atletika/shoes/man'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </Link>
                    <img className='item-image' src={itemData[5]} alt={`Изображение товара ${itemData[1]}`} />
                </div>
                <div className='item-info__page'>{itemData[2]} {itemData[3]} ({itemData[4]})</div>
                <div className='sizes-container '>
                    <div className='sizes'>
                            {displayedSizes}
                    </div>
                </div>
                <div className='article-container'>
                    <div className='article-name'>Описание:</div>
                    <div className='article'>{itemData[27]}</div>
                </div>
            </div>
            <div className='price-container'>
                    <div className='price'>
                        <div className='new-price'>Цена: {itemData[26]}₽</div>
                        <div className='old-price'>{Math.round(itemData[26] * 1.1)}₽</div>
                    </div>
            </div>
        </>
    );
};
