const { response } = require('express');
const { Categoria } = require('../models');


const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const parametros = {estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(parametros),
        Categoria.find(parametros)
            .populate([{model: 'usuario',path: 'nombre'}])
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        categorias
    });
}

const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre').populate('app')
    res.json(categoria);
}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        app: req.app._id,
        usuario: req.usuario._id
    }
    console.log('La data');
    console.log(req.usuario);

    const categoria = new Categoria( data );

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { _id, estado, app, ...data } = req.body;
    data.nombre = resto.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data )

    res.json(categoria);    
}

const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado : false});

    res.json({
        categoria
    });
}

module.exports = {
    obtenerCategoria,
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}