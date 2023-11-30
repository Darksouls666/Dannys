import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    // Definiendo estado
    const [name, setName] = useState('');
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

    // Registro
    const signup = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const cred = await createUserWithEmailAndPassword(auth, email, password);

            // Crear un documento en Firestore para el usuario
            const firestore = getFirestore();
            const userDocRef = doc(firestore, 'SignedUpUsersData', cred.user.uid);
            await setDoc(userDocRef, {
                Name: name,
                Email: email,
                Password: password
            });

            setName('');
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError('Error al registrar usuario: ' + err.message);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Registro</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Nombre</label>
                <input type="text" className='form-control' required onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Contraseña</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ENVÍAR</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>
                ¿Ya tienes una cuenta? Logeate <Link to="/login">Aquí</Link>
            </span>
        </div>
    );
};

export default Signup;
