import { Routes, Route } from 'react-router-dom'
import { Cart } from './pages/cart/Cart'
import { ItemPage } from './pages/item-page/ItemPage'
import { Menu } from './pages/menu/Menu'
import { AtletikaMenu } from './pages/atletika/AtletikaMenu'
import { TRunner } from './pages/trunner/TRunner'
import { Shoes } from './pages/atletika/shoes/Shoes'
import { ManShoes } from './pages/atletika/shoes/ManShoes'
import { WomanShoes } from './pages/atletika/shoes/WomanShoes'
import { Spikes } from './pages/atletika/spikes/Spikes'
import { Equipment } from './pages/atletika/equipment/Equipment'
import { Accessories } from './pages/atletika/equipment/Accessories'
import { ManEquipment } from './pages/atletika/equipment/ManEquipment'
import { WomanEquipment } from './pages/atletika/equipment/WomanEquipment'
import { TechSpikes } from './pages/atletika/spikes/TechSpikes'
import { SprintSpikes } from './pages/atletika/spikes/SprintSpikes'
import { MiddleSpikes } from './pages/atletika/spikes/MiddleSpikes'


function App() {
  return (
            <>
              <Routes>
              <Route path='/' element={<Menu/>}/>
                <Route path='/atletika' element={<AtletikaMenu/>}/>
                <Route path='/atletika/shoes' element={<Shoes/>}/>
                <Route path='/atletika/shoes/man' element={<ManShoes/>}/>
                <Route path='/atletika/shoes/woman' element={<WomanShoes/>}/>
                <Route path='/atletika/spikes' element={<Spikes/>}/>
                <Route path='/atletika/spikes/middle' element={<MiddleSpikes/>}/>
                <Route path='/atletika/spikes/spint' element={<SprintSpikes/>}/>
                <Route path='/atletika/spikes/tech' element={<TechSpikes/>}/>
                <Route path='/atletika/equipment' element={<Equipment/>}/>
                <Route path='/atletika/equipment/accessories' element={<Accessories/>}/>
                <Route path='/atletika/equipment/man' element={<ManEquipment/>}/>
                <Route path='/atletika/equipment/woman' element={<WomanEquipment/>}/>
                <Route path='/trunner' element={<TRunner/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/shoes/:itemnumber' element={<ItemPage/>}/>
              </Routes>
            </>
  )
}

export default App
