const { response } = require('express');
const { Producto } = require('../models');

const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const parametros = {estado:true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(parametros),
        Producto.find(parametros)
            .populate('usuario','nombre')
            .populate('application','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        productos
    });

}

const obtenerProducto = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
                                .populate('usuario','nombre')
                                .populate('application','nombre')
    res.json(producto);
}

const crearProducto = async(req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    const data = {
        ...body,
        usuario: req.usuario._id
    }
    console.log(data);

    const producto = new Producto( data );
    
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { _id, estado, application, usuario, ...data } = req.body;
    
    data.usuario = req.usuario._id;

    console.log(data);

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.json(producto);    
}

const borrarProducto = async(req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado : false});

    res.json({
        producto
    });
}

module.exports = {
    obtenerProductos, 
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}