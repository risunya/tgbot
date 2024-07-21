import { Routes, Route } from 'react-router-dom'
import { Cart } from './pages/cart/Cart'
import { ItemPage } from './pages/item-page/ItemPage'
import { Menu } from './pages/menu/Menu'
import { Atletika } from './pages/atletika/Atletika'
import { TRunner } from './pages/trunner/TRunner'


function App() {
  return (
            <>
              <Routes>
              <Route path='/' element={<Menu/>}/>
                <Route path='/atletika' element={<Atletika/>}/>
                <Route path='/trunner' element={<TRunner/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/shoes/:itemnumber' element={<ItemPage/>}/>
              </Routes>
            </>
  )
}

export default App
