import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { Cart } from './pages/cart/Cart'
import { Home } from './pages/home/Home'
import Item from './pages/item/Item'

function App() {
  return (
    <>
     <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/shoes/:itemnumber' element={<Item/>}/>
            </Routes>
      <Footer/>
    </>
  )
}

export default App
