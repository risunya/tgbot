import './itemlist.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { Search } from '../../components/search/Search';
import { Filter } from '../filter/Filter';

interface Item {
    brand: string;
    model: string;
    otherField1: string;
    imageUrl: string;
    sizes: number[];
    price: string;
}

interface MyButtonProps {
    /** The text to display inside the button */
    kind: string;
    /** Whether the button can be interacted with */
    sex: string;
}

export const ItemList = ({ kind, sex }: MyButtonProps) => {

    const validSizes = [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31];
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Item[]>([]);
    const [sizesCount, setSizesCount] = useState<{ [size: number]: number }>({});
    const [uniqueBrands, setUniqueBrands] = useState<{ brand: string, count: number }[]>([]);
    const [uniqueModels, setUniqueModels] = useState<{ model: string, count: number }[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const location = useLocation();

    useEffect(() => {
            // Массив допустимых размеров
            const validSizes: number[] = [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31];

            // Функция для преобразования количества единиц в реальные размеры
            const transformSizes = (sizes: (string | number)[]): (number | "")[] => {
                return sizes.map((size, index) => {
                    if (typeof size === 'number' && size > 0 && size <= validSizes.length) {
                        return validSizes[index] || ""; // Используем индекс для поиска размера
                    }
                    return ""; // Если это строка или невалидное число, возвращаем пустую строку
                });
            };

            // Пример использования в функции fetchData
            const fetchData = async () => {
                const scriptUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=G3CeltWL35S5i7RV1X0rmc7QNng7LgPJcc8lL-KH3pPGgSVrEdHSJQOw6TLw5_YZU0-tmWlQOtUmqGor956JM8NOIIWu8WqSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGDTITHZ7kaIQxVYQNWenukIUJAPWe7F5K_uv3NEXJkPS0aOxSNXs-Ns-sk-fPmDrOyrVG5k3fWMezS64eO1CyQp9ciXVm0icg&lib=MXR79vg1ZLOpNmISJxcAQR38eJs5q9m5W';

                try {
                    const response = await fetch(scriptUrl);
                    if (!response.ok) {
                        throw new Error('Ошибка при получении данных: ' + response.status);
                    }
                    const jsonData = await response.json();
                    const kindFilteredItems = jsonData.result.filter((item: any) => item[0] == kind);
                    const sexFilteredItems = kindFilteredItems.filter((item: any) => item[1] == sex);
                    console.log(sexFilteredItems)
                    const items: Item[] = sexFilteredItems.slice(0).map((item: any) => ({
                        brand: item[2].trim(),
                        model: item[3],
                        otherField1: item[4],
                        imageUrl: item[5],
                        sizes: transformSizes(item.slice(6, 25)), // Применяем функцию преобразования
                        price: item[26]
                    }));
                    setData(items);
                    console.log(items)
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
            const countSizes = (items: Item[], validSizes: number[]) => {
                const counts: { [key: number]: number } = {};

                // Инициализируем все допустимые размеры в counts с значением 0
                for (const size of validSizes) {
                    counts[size] = 0;
                }

                items.forEach(item => {
                    item.sizes.forEach((size, index) => {
                        if (size > 0 && validSizes.includes(validSizes[index])) {
                            counts[validSizes[index]] += size;
                        }
                    });
                });

                // Фильтруем только ненулевые значения
                const nonZeroCounts = Object.fromEntries(
                    Object.entries(counts).filter(([, value]) => value !== 0)
                );
                setSizesCount(nonZeroCounts);
            };

            // Вызов функции
            countSizes(data, validSizes);

            // Подсчет брендов и моделей
            const brandsCount: { [key: string]: number } = {};
            const modelsCount: { [key: string]: number } = {};

            data.forEach((item) => {
                const brand = item.brand.trim();
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

    const handleFilter = (sizeFilter: number[], brandFilter: string[], modelFilter: string[], sort: 'asc' | 'desc') => {
        setSortOrder(sort);
        let filtered = data;


        if (sizeFilter.length > 0) {
            filtered = filtered.filter(item => 
                item.sizes.some(size => sizeFilter.includes(size))
            );
            console.log(filtered);
        }

        if (brandFilter.length > 0) {
            filtered = filtered.filter(item => brandFilter.includes(item.brand.trim()));
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
                        {filteredSearchData.map((item, index) => {
                            return (
                                <Link to={`${location.pathname + "/" + (item.otherField1)}`} key={index} className='item'>
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
                                    <div className='item-sizes'>
                                    
                                    {item.sizes.map((size) => 
                                        (String(size) === '') ? '' : <div key={size}>{size}</div>
                                    )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};
