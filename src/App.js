import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/home/home';
import AddProducts from './componentes/addProduct/addproducts';
import Contacto from './pages/Contacto';
import Somos from './pages/Somos';
import Navbar from './componentes/navbar';
import ProductsContextProvider from './global/ProductsContext';

function App() {
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
          <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="addProducts" element={<AddProducts />} />
              <Route path="/Contacto" element={<Contacto />} />
              <Route path="/Somos" element={<Somos />} />
            </Routes>
          </BrowserRouter>
        </ProductsContextProvider>
      </div>
    </div>
  );
}

export default App;

