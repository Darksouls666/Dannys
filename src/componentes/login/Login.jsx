import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // Definiendo estado
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();  // Utiliza useNavigate para la navegación

    useEffect(() => {
        const auth = getAuth();
        // Configura un observador de estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario está autenticado, podrías redirigir a otra página si es necesario
                navigate('/');
            }
        });

        // Limpia el observador al desmontar el componente
        return () => unsubscribe();
    }, [navigate]);

    // Inicio de sesión
    const login = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);

            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError('Error al iniciar sesión: ' + err.message);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Iniciar Sesión</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Contraseña</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>INICIAR SESIÓN</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>
                ¿No tienes una cuenta? Regístrate <Link to="/signup">aquí</Link>
            </span>
        </div>
    );
};

export default Login;
