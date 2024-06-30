import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import { Search } from '../../components/search/Search';

export const Home = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbwIG5sr1XNVoh78kjCVZ_FDwqvsvEqmdq_qGuV6THGotrKanyatTS70JbsZumeIf1uT/exec';

            try {
                const response = await fetch(scriptUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных: ' + response.status);
                }
                const jsonData = await response.json();
                setData(jsonData.result);
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const newData = data && Array.isArray(data) ? data.slice(1) : [];

    return (
        <div className='content'>
            {loading ? (
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            ) : (
                data && (
                    <>
                        <Search />
                        <div className='item-list'>
                            {newData.map((item: any, index: number) =>
                                <Link to={`/${item[0]}`} key={index} className='item'>
                                    <div className='item-container'>
                                        <img className='item-image' src={item[1]} alt={`Изображение товара ${item[0]}`} />
                                    </div>
                                    <div className='price'>
                                        <div className='new-price'>{item[23]}₽</div>
                                        <div className='old-price'>{Math.round(item[23] * 1.1)}₽</div>
                                    </div>
                                    <div className='item-info'>{item[0]} ({item[2]})</div>
                                </Link>
                            )}
                        </div>
                    </>
                )
            )}
        </div>
    );
};
