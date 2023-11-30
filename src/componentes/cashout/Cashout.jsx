import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { CartContext } from '../../global/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cashout = (props) => {
    const navigate = useNavigate();

    const { totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const db = getFirestore();
                const userDocRef = doc(db, 'SignedUpUsersData', user.uid);

                const unsubscribeUserDoc = onSnapshot(userDocRef, (snapshot) => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                });

                return () => {
                    unsubscribeUserDoc();
                };
            } else {
                navigate('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    const cashoutSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const db = getFirestore();
                const date = new Date();
                const time = date.getTime();

                // Utiliza setDoc para agregar datos a Firestore
                await setDoc(doc(db, 'Buyer-info', user.uid + '_' + time), {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                });

                setCell('');
                setAddress('');
                dispatch({ type: 'EMPTY' });
                setSuccessMsg('Tu orden ha sido solicitada. Gracias por visitarnos. Serás redirigido a la página de inicio en 5 segundos');
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className='container'>
                <br />
                <h2>Detalles del pago</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className='form-control' required value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Número de télefono</label>
                    <input type="number" className='form-control' required onChange={(e) => setCell(e.target.value)} value={cell} placeholder='ej: 417 666 66 66' />
                    <br />
                    <label htmlFor="Delivery Address">Dirección a enviar</label>
                    <input type="text" className='form-control' required onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Total a pagar</label>
                    <input type="number" className='form-control' required value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Número de kilos</label>
                    <input type="number" className='form-control' required value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>Envíar</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    );
};
