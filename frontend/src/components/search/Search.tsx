import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface DataItem {
  [key: string]: any; // Adjust this based on the structure of your data items
}

interface SearchProps {
  data: DataItem[];
}

export const Search: React.FC<SearchProps> = ({ data }) => {
  // Проверяем, что data является массивом
  const list = Array.isArray(data) ? data.map(item => item[0]) : [];

  return (
    <div className='search-container'>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list}
        sx={{ 
          width: 380, 
          '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator': {
            color: 'var(--text-color)',
          },
          '& .MuiAutocomplete-inputRoot': {
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--text-color)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--text-color)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--text-color)',
            },
          },
        }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Я ищу модель" 
            sx={{
              backgroundColor: 'var(--background-color)',
              color: 'var(--text-color)',
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--text-color)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--text-color)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--text-color)',
              },
            }}
          />
        )}
      />
    </div>
  );
};