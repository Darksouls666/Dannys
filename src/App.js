import './App.css';
import Card from './componentes/card/card';
import './componentes/navbar/index.jsx';
import Navbar from './componentes/navbar/index.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Somos from './pages/Somos';
import Cart from './pages/Cart';
import LoginSignUp from './pages/LoginSignUp';
import Product from './pages/Product';


function App() {
  return (
    <div className="App">

      <div>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Inicio />}></Route>
            <Route path='/Contacto' element={<Contacto />}></Route>
            <Route path='/Somos' element={<Somos />}></Route>
            <Route path='/product' element={<Product />}>
              <Route path='productId' element={<Product />}></Route>
            </Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/login' element={<LoginSignUp />}></Route>
          </Routes>
          <Card></Card>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
