const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require( 'express' );
const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');
const { model } = require('mongoose');

const cargarArchivo = async (req, res = response) => {
    
    try {
        //const pathCompleto = await subirArchivo(req.files, ['txt','md'], 'textos');
        const pathCompleto = await subirArchivo(req.files);
        res.json({
            path: pathCompleto
        })

    } catch (error) {
        res.status(400).json({ msg })
    }
}

const actualizarArchivo = async(req, res = response) => {

    const { id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            
            if(!modelo) {
                res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':          
            modelo = await Producto.findById(id);
            console.log(modelo);
            if(!modelo) {
                res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                });
            }                
            break;            

        default:
            return res.status(500).json({msg: 'pendiente esta validacion'});
    }

    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length-1];
        const [ public_id ] = modelo.img.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    modelo.img = secure_url

/*     if(modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
 */
    await modelo.save();

    res.json(modelo);

}

const mostrarArchivo = async(req, res = response) => {

    const { id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            
            if(!modelo) {
                res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':          
            modelo = await Producto.findById(id);
            console.log(modelo);
            if(!modelo) {
                res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                });
            }                
            break;            

        default:
            return res.status(500).json({msg: 'pendiente esta validacion'});
    }

    if(modelo.img) {
        console.log('existe imagen');
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            console.log('existe imagen');
            return res.sendFile(pathImagen);
        }
    }

    res.json({ msg: 'Falta place holder'});
}
module.exports = { 
    cargarArchivo,
    actualizarArchivo,
    mostrarArchivo
}