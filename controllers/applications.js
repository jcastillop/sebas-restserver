const { response } = require('express');
const { Application } = require('../models');

const obtenerApp = async (req, res = response) => {

}

const crearApp = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const appDB = await Application.findOne({ nombre });
    if( appDB ){
        return res.status(400).json({
            msg: `La app ${ categoriaDB.nombre }, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {
        nombre
    }

    const app = new Application( data );

    await app.save();

    res.status(201).json(app);
    
}

const actualizarApp = async (req, res = response) => {
    
}

const borrarApp = async (req, res = response) => {
    
}

module.exports = {
    obtenerApp,
    crearApp,
    actualizarApp,
    borrarApp
}