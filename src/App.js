import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './componentes/home/home'; // Asumo que el componente se llama "Home", no "home"
import AddProducts from './componentes/addProduct/addproducts'; // Asumo que el componente se llama "AddProducts", no "addproducts"
import Contacto from './pages/Contacto';
import Somos from './pages/Somos';
import Navbar from './componentes/navbar';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='addProducts' element={<AddProducts />} />
            <Route path='/Contacto' element={<Contacto />} />
            <Route path='/Somos' element={<Somos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
