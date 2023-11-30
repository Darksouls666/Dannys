import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { CartContext } from '../../global/CartContext';
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import './navbar.css';

function Navbar() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

    // Accede al contexto del carrito para mostrar el total de productos agregados
    const { totalQty } = useContext(CartContext);

    useEffect(() => {
        const auth = getAuth();
        const firestore = getFirestore(); // Inicializa Firestore aquí

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Usuario autenticado:", user);
            if (user) {
                setUser(user);

                const userDocRef = doc(firestore, 'SignedUpUsersData', user.uid);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().Name);
                    } else {

                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario desde Firestore:", error);
                }
            } else {
                setUser(null);
                setUserName('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            setUser(null);
            setUserName('');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

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
                {user ? (
                    <>
                        <p>Bienvenido, {userName}</p>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <Link to="/Login"><button>Login</button></Link>
                )}
                <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
                <div className="nav-cart-count">{totalQty}</div>
            </div>
        </nav>
    );
}

export default Navbar;
