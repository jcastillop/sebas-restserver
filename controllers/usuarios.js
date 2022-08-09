const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//const { findByIdAndUpdate } = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0} = req.query;
    const parametros = {estado:true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(parametros),
        Usuario.find(parametros)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol, application} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol, application});
    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();//valor por defecto 10
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - usuariosPosts',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if(password) {
        const salt = bcryptjs.genSaltSync();//valor por defecto 10
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}