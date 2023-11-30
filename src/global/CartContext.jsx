import React, { createContext, useReducer, useEffect } from 'react';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    // Utilizar localStorage para obtener el estado inicial del carrito si está almacenado
    const storedCart = JSON.parse(localStorage.getItem('shoppingCart')) || { shoppingCart: [], totalPrice: 0, totalQty: 0 };

    const [cart, dispatch] = useReducer(CartReducer, storedCart);

    // Guardar en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    );
};
