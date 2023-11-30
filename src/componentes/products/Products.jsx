import React, { useContext } from 'react';
import { ProductsContext } from '../../global/ProductsContext'
import "../products/products.css";
import { CartContext } from '../../global/CartContext';

export const Products = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            <div className='products-container'>
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            MXN {product.ProductPrice}.00
                        </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>AÑADIR AL CARRITO</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products;

