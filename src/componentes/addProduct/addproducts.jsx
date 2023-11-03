import React, { useState } from 'react';
import "./addproducts.css";
import { storage, db } from "../../config/config"

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // TIPOS DE IMAGEN


    // EL MANEJADOR DE IMAGENES
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


    //AÑADIR PRODUCTOS UNA VEZ ENVIADOS
    const addProduct = (e) => {
        e.preventDefault();
        // GUARDAR LA IMAGEN 
        console.log(productName, productPrice, productImg)
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err =>
            setError(err.message)
            , () => {
                // OBTENIENDO EL URL DE LA IMAGEN SI ES CORRECTA ENTONCES GUARDANDOLA EN LA DB
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0);
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message));
                })
            })
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
    )
}

export default AddProducts;
