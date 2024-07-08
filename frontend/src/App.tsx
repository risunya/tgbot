import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Cart } from './pages/cart/Cart'
import { Home } from './pages/home/Home'
import { ItemPage } from './pages/item-page/ItemPage'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
  return (
    <SkeletonTheme baseColor='var(--text-color)' highlightColor='var(--background-color)'>
     <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/shoes/:itemnumber' element={<ItemPage/>}/>
            </Routes>
    </SkeletonTheme>
  )
}

export default App
