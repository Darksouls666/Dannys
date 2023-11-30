import React from "react";
import "./css/contacto.css";

const Contacto = () => {
    return (
        <div className="contacto">
            <h2>Contacto</h2>
            <p>
                Frutería Danys se encuentra a su servicio para la venta de frutas de la
                mejor calidad y frescas a precios increíbles, con promociones y el mejor
                trato desde hace más de una década.
            </p>
            <p>Número 1 en Acámbaro, Guanajuato.</p>
            <h2>Contactanos por cualquier duda o queja:</h2>
            <ul>
                <li>Teléfono: +52 417 666 23 99</li>
            </ul>
            <h2>Encuéntranos en:</h2>
            <ul>
                <li>Melchor Ocampo, Explanada Auditorio, Acámbaro, Guanajuato</li>
            </ul>
            <h2>Mapa:</h2>
            <div className="mapa">
                <img src="/img/Mapa.jpg" alt="Mapa de ubicación" />
            </div>
        </div>
    );
};

export default Contacto;
