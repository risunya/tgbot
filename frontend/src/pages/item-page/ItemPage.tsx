import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itempage.scss';
import { Header } from '../../components/header/Header';

export const ItemPage = () => {
    const { itemnumber } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(true);

    const handleIsActive = () => {
        isActive == false ? setIsActive(true) : setIsActive(false);
    }
    const addToCart = (itemData : any) => {
        // Получаем текущий массив cart из localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
        // Определяем индекс как длину текущего массива cart
        const index = cart.length;
    
        // Добавляем элемент в массив под определенным индексом
        cart[index] = itemData;
    
        // Сохраняем обновленный массив обратно в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    const removeFromCart = () => {
        // Получаем текущий массив cart из localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
        // Удаляем элемент под указанным индексом, если он существует
        cart.pop();
    
        // Сохраняем обновленный массив обратно в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    useEffect(() => {
        const fetchItemData = async () => {
            const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=G3CeltWL35S5i7RV1X0rmc7QNng7LgPJcc8lL-KH3pPGgSVrEdHSJQOw6TLw5_YZU0-tmWlQOtUmqGor956JM8NOIIWu8WqSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGDTITHZ7kaIQxVYQNWenukIUJAPWe7F5K_uv3NEXJkPS0aOxSNXs-Ns-sk-fPmDrOyrVG5k3fWMezS64eO1CyQp9ciXVm0icg&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                const result = jsonData.result.filter((item: any) => item[4] == itemnumber);
                const item = result[0];
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
    const value = itemData.slice(6,25);
    const displayedSizes = sizes.map((size, index) => {
        // Если значение существует и не пустое, отображаем размер
        return value[index] && value[index] !== '' ? <div className='round-size' key={size}>{size}</div> : null;
    });

    return (
        <>
            <Header />
            <div className='item-detail'>
                <div className='item-container'>
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
                    <button className={'price-button' + (isActive ? '' : ' active')}
                    onClick={() => {
                       
                        handleIsActive();
                        { isActive ? addToCart(itemData) : removeFromCart()}
                    }}
                    >{isActive ? 'Добавить' : 'Удалить'}</button>
            </div>
        </>
    );
};
