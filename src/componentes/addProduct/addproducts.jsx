import React, { useState } from 'react';
import './addproducts.css';
import { storage, db } from '../../config/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Por favor selecciona una imagen de tipo png o jpeg');
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        if (!productImg || !productName || productPrice <= 0) {
            setError('Por favor completa todos los campos');
            return;
        }

        try {
            const uploadTask = uploadBytesResumable(ref(storage, `product-images/${productImg.name}`), productImg);

            await uploadTask;

            const imageUrl = await getDownloadURL(ref(storage, `product-images/${productImg.name}`));

            await addDoc(collection(db, 'Products'), {
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: imageUrl
            });

            setProductName('');
            setProductPrice(0);
            setProductImg(null);
            setError('');
            document.getElementById('file').value = '';
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='card-title'>AÑADIR PRODUCTOS</h2>
                    <hr />
                    <form autoComplete='off' className='form-group' onSubmit={addProduct}>
                        <label htmlFor="product-name">Nombre del producto</label>
                        <br />
                        <input type="text" className='form-control' required onChange={(e) => setProductName(e.target.value)} value={productName} />
                        <br />
                        <label htmlFor="product-price">Precio del producto</label>
                        <br />
                        <input type="number" className='form-control' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                        <br />
                        <label htmlFor="product-img">Imagen del producto</label>
                        <br />
                        <input type="file" className='form-control' onChange={productImgHandler} id='file' />
                        <br />
                        <button className='btn btn-success btn-add'>AÑADIR</button>
                    </form>
                    {error && <span>{error}</span>}
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
