import React from "react";
import "./card.css"

function Card() {
    return (
        <div className="card">
            <img src={process.env.PUBLIC_URL + '/img/12637-Manzana_Roja.jpg'} alt="Producto" />
            <h2>Manzana</h2>
            <button className="add-to-cart">Agregar al carrito</button>
        </div>
    );
}

export default Card;
