const { response } = require('express');
const { Medida } = require('../models');


const obtenerMedidas = async (req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const parametros = {estado:true}

    const [total, medidas] = await Medida.all([
        Medida.countDocuments(parametros),
        Medida.find(parametros)
            .populate('usuario','nombre')
            .populate('application','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        medidas
    });
}

const obtenerMedida = async (req, res = response) => {
    const { id } = req.params;
    const medida = await Medida.findById(id)
    res.json(medida);
}

const crearMedida = async (req, res = response) => {
    const { nombre, codigo } = req.body;
    const busqueda = {'codigo' : codigo.toUpperCase()}
    const medidaDB = await Medida.findOne( busqueda );

    if( medidaDB ){
        return res.status(400).json({
            msg: `La medida con codigo ${ medidaDB.codigo }, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {
        nombre,
        codigo,
        usuario: req.usuario._id
    }

    const medida = new Medida( data );

    await medida.save();

    res.status(201).json(medida);

}

const actualizarMedida = async (req, res = response) => {
    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;
    data.codigo = data.codigo.toUpperCase();
    data.usuario = req.usuario._id;

    const medida = await Medida.findByIdAndUpdate( id, data )

    res.json(medida);    
}

const borrarMedida = async (req, res = response) => {
    const { id } = req.params;

    const medida = await Medida.findByIdAndUpdate(id, {estado : false});

    res.json({
        medida
    });
}

module.exports = {
    obtenerMedida,
    obtenerMedidas,
    crearMedida,
    actualizarMedida,
    borrarMedida
}