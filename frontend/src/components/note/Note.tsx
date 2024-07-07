import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './note.scss'

export const Note = () => {
    return (
        <div className="note">
        <Accordion sx={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)'}}>
            <AccordionSummary
                expandIcon={
                <ExpandMoreIcon 
                sx={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)'}}
                />}
                sx={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)'}}
            >
            Как выбрать размер кроссовок?
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)'}}>
            Для того чтобы определить размер беговых кроссовок в системе US по длине стопы в сантиметрах, сначала измерьте свою стопу. Получив длину стопы в сантиметрах, добавьте 0,5-1 см для запаса, чтобы кроссовки не натирали и обеспечивали комфорт при беге. Сравните полученное измерение с размерной таблицей производителя, поскольку у разных брендов могут быть разные размерные сетки. Обычно, длина стопы соответствует определенному размеру US по таблице конкретного бренда. При примерке кроссовок обратите внимание, чтобы пальцы не упирались в носок и обувь не стесняла ногу. Если у вас узкая или широкая стопа, выбирайте соответствующую модель, так как некоторые бренды предлагают обувь разной ширины.
            </AccordionDetails>
        </Accordion>         
        </div>
    )
}