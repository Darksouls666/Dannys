import React from "react";
import './navbar.css';
import logo from "../assets/logo.png"
import cart_icon from "../assets/cart_icon.png"
import { Link } from "react-router-dom";

function Navbar() {
    return (

        <nav className="navbox">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>DANNYS</p>
            </div>
            <ul className="nav-menu">
                <li><Link to="/">INICIO</Link></li>
                <li><Link to="/Contacto">CONTACTO</Link></li>
                <li><Link to="/Somos">SOMOS</Link></li>
            </ul>
            <div className="nav-login-cart">
                <Link to="Login"><button>Login</button></Link>
                <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </nav>
    );
}

export default Navbar;