import { useTheme } from './use-theme'
import './themebutton.scss'
import { MoonImage } from './assets/MoonImage'
import { SunImage } from './assets/SunImage'

export const ThemeButton = () => {
    const {theme, setTheme} = useTheme()
    const handleLightThemeClick = () => {
        (theme === 'light') ? setTheme('dark') : setTheme('light');
    }
    return (
        <div className='theme-button' onClick={handleLightThemeClick}> 
            {(theme === 'light') ? <MoonImage /> : <SunImage />  }
         </div>
    )
}