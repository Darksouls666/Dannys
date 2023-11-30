import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/home/home';
import AddProducts from './componentes/addProduct/addproducts';
import Contacto from './pages/Contacto';
import Somos from './pages/Somos';
import Navbar from './componentes/navbar';
import ProductsContextProvider from './global/ProductsContext';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../src/config/config';
import Signup from './componentes/signup/Signup';
import { CartContextProvider } from './global/CartContext';
import Cart from './componentes/cart/Cart';
import 'react-toastify/dist/ReactToastify.css';
import Login from './componentes/login/Login'
import { Cashout } from './componentes/cashout/Cashout';



function App() {

  // Inicializar Firebase
  useEffect(() => {
    initializeApp(firebaseConfig);
    return () => {
      // Puedes realizar alguna limpieza si es necesario al desmontar el componente
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(error => {
          console.error('Error al registrar el Service Worker:', error);
        });
    }
  }, []);

  return (
    <div className="App">
      <div>
        <ProductsContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <Navbar></Navbar>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="addProducts" element={<AddProducts />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path="/Somos" element={<Somos />} />
                <Route path='/Signup' element={<Signup />}></Route>
                <Route path='/Login' element={<Login />}></Route>
                <Route path='/Cart' element={<Cart />}></Route>
                <Route path='/cashout' element={<Cashout />}></Route>
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </ProductsContextProvider>
      </div>
    </div>
  );
}

export default App;
