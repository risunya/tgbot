import { useState, useRef, useEffect } from 'react';
import './accordion.scss';

export const Accordion = () => {
    const [isOpened, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = useState(0);

    useEffect(() => {
        if (panelRef.current) {
            setPanelHeight(panelRef.current.scrollHeight);
        }
    }, [isOpened]);

    return (
        <div className="accordion">
            <div className="note-wrapper">
                <div className="note">
                    <div className="info-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <div className="note-text">КАК ВЫБРАТЬ НУЖНЫЙ РАЗМЕР?</div>
                    </div>
                    <div className="arrow-wrapper">
                        {!isOpened ? <div className='plus' onClick={() => setOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div> :
                        <div className='minus' onClick={() => setOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>}
                    </div>
                </div>
                <div 
                    ref={panelRef} 
                    className={`panel ${isOpened ? 'active' : ''}`} 
                    style={{ maxHeight: isOpened ? `${panelHeight}px` : '0' }}
                >
                    Для того чтобы определить размер беговых кроссовок в системе US по длине стопы в сантиметрах, сначала измерьте свою стопу. Получив длину стопы в сантиметрах, добавьте 0,5-1 см для запаса, чтобы кроссовки не натирали и обеспечивали комфорт при беге. Сравните полученное измерение с размерной таблицей производителя, поскольку у разных брендов могут быть разные размерные сетки. Обычно, длина стопы соответствует определенному размеру US по таблице конкретного бренда. Если у вас узкая или широкая стопа, выбирайте соответствующую модель, так как некоторые бренды предлагают обувь разной ширины.
                </div>
            </div>
        </div>
    )
}
