const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'cloudinary://862953824118737:qRXjBRmEb2LAaaA-5mb_InbJI_o@drirwmk7f',
    api_key: '862953824118737',
    api_secret: 'qRXjBRmEb2LAaaA-5mb_InbJI_o',
    secure: false
});

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }


}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imagenes previas
    if (modelo.imagen) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploas', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.imagen = nombre;

    await modelo.save();

    res.json(modelo);
}

const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imagenes previas
    if (modelo.imagen) {
        const nombreArr = modelo.imagen.split('/');
        const nombre = nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    try {
        const {tempFilePath} = req.files.archivo;
        const resp = await cloudinary.uploader.upload(tempFilePath);
        //modelo.imagen = secure_url;

        //await modelo.save();

        res.json(resp);

    }
    catch (error) {
        res.json(error);
    }


}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imagenes previas
    if (modelo.imagen) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const pathImagenFaltante = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathImagenFaltante);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}