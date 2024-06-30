import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './item.scss';

const Item = () => {
    const { itemnumber } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemData = async () => {
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbwIG5sr1XNVoh78kjCVZ_FDwqvsvEqmdq_qGuV6THGotrKanyatTS70JbsZumeIf1uT/exec';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                const item = jsonData.result.find((item: any) => item[0] === itemnumber);
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
        <div className='item-detail'>
            <div className='item-container'>
                <img className='item-image' src={itemData[1]} alt={`Изображение товара ${itemData[0]}`} />
            </div>
            <div className='item-info'>{itemData[0]} ({itemData[2]})</div>
            <div className='price'>Цена:
                <div className='new-price'>{itemData[23]}₽</div>
                <div className='old-price'>{Math.round(itemData[23] * 1.1)}₽</div>
            </div>
            <div className='sizes-name'>В наличии:</div>
            <div className='sizes'>
                {
                    [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31].map((size, index) => {
                        const value = itemData[index + 3];
                        return value ? <div key={index}>{size} - {value}</div> : null;
                    })
                }
            </div>
        </div>
    );
};

export default Item;
