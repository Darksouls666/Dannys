import { createContext, useEffect, useState } from 'react';
import { db } from '../config/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Products'), (snapshot) => {
            const newProducts = snapshot.docs.map((doc) => ({
                ProductID: doc.id,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImg: doc.data().ProductImg,
            }));
            setProducts(newProducts);
        });

        return () => {
            // Limpiar la suscripción cuando el componente se desmonta
            unsubscribe();
        };
    }, []); // Se ejecutará solo una vez al montar el componente

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
