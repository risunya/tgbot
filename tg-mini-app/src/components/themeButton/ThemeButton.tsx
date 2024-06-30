import { useTheme } from './use-theme'
import './themebutton.scss'

export const ThemeButton = () => {
    const {theme, setTheme} = useTheme()
    const handleLightThemeClick = () => {
        (theme === 'light') ? setTheme('dark') : setTheme('light');
    }
    return (
        <div className='theme-button' onClick={handleLightThemeClick}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-moon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
         </div>
    )
}