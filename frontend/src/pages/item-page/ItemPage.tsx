import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './itempage.scss';

export const ItemPage = () => {
    const { itemnumber } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=ioZrSrrljcJ27lqaUkL7Oyp4Bzn9Hws1-RNYjkYicR2wtmng5Kko3J-5L0PlvtcUa5t8xmClKBBXpF00TIdEQ6B3GJaHfclIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnI-xyotCUTNaW-yzP64ppF_YYh_o1SUHXOdr4MEA4Xztmg4FCJU_GtQ3Z82WAYIjSaHS3Sg6Noqz7u56m-eeIVJlOnwZOtit6Q&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

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
                    <Link  to='/atletika/shoes'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </Link>
                    <img className='item-image' src={itemData[5]} alt={`Изображение товара ${itemData[1]}`} />
                </div>
                <div className='item-info'>{itemData[2]} {itemData[3]} ({itemData[4]})</div>
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
