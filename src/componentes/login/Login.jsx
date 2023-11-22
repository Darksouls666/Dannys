import React, { useState } from 'react';
import { auth } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        // Validaciones adicionales
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError('');
                navigate('/');
            })
            .catch((err) => {
                console.error('Error al iniciar sesión:', err);
                setError(err.message);
            });
    };

    return (
        <div className='container'>
            <br />
            <h2>Iniciar sesión</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className='form-control'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <br />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    className='form-control'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>
                    LOGIN
                </button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>
                ¿No tienes una cuenta? Regístrate
                <Link to="/Signup"> Aquí</Link>
            </span>
        </div>
    );
};
