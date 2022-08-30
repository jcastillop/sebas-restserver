const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const {correo, password} = req.body

    try {

        //Validar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        
        if(!usuario) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - correo'
            })
        }
        //Usuario activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - estado:false'
            })
        }
        //Validar contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - password'
            })
        }        
        //Generar Jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }



}

const validarTokenUsuario = async (req, res = response ) => {

    // Generar el JWT
    const token = await generarJWT( req.usuario._id );
    
    res.json({
        usuario: req.usuario,
        token: token,
    })

}

module.exports = {
    login,
    validarTokenUsuario
}