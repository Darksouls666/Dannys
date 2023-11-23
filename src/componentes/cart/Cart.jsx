import React, { useContext } from 'react'
import { CartContext } from '../../global/CartContext'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { trash2 } from 'react-icons-kit/feather/trash2'
import { Link } from 'react-router-dom'

const Cart = () => {
    const data = useContext(CartContext);
    console.log(data);

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    return (
        <>
            <div className='cart-container'>
                {
                    shoppingCart.length === 0 && <>
                        <div>No tienes items en tu cart (Refresca la página)</div>
                        <div><Link to="/">Regresar a la pagina de inicio</Link></div>
                    </>
                }
                {shoppingCart && shoppingCart.map(cart => (
                    <div className='cart-card' key={cart.ProductID}>

                        <div className='cart-img'>
                            <img src={cart.ProductImg} alt="not found" />
                        </div>

                        <div className='cart-name'>{cart.ProductName}</div>

                        <div className='cart-price-orignal'>MX {cart.ProductPrice}.00</div>

                        <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                            <Icon icon={ic_add} size={24} />
                        </div>

                        <div className='quantity'>{cart.qty}</div>

                        <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                            <Icon icon={ic_remove} size={24} />
                        </div>

                        <div className='cart-price'>
                            MX {cart.TotalProductPrice}.00
                        </div>

                        <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                            <Icon icon={trash2} size={24} />
                        </button>
                    </div>
                ))
                }
                {shoppingCart.length > 0 && <div className='cart-summary'>
                    <div className='cart-summary-heading'>
                        Resumen
                    </div>
                    <div className='cart-summary-price'>
                        <span>Precio total</span>
                        <span>MXN {totalPrice}.00</span>
                    </div>
                    <div className='cart-summary-price'>
                        <span>Cantidad total</span>
                        <span>{totalQty}</span>
                    </div>
                    <Link to='cashout' className='cashout-link'>
                        <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                            Dinero en entrega
                        </button>
                    </Link>
                </div>}
            </div>
        </>
    )
}

export default Cart;