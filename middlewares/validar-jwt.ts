import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
//const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'El token no existe en la peticion'
        });
    }

    try {

        const decoded  = jwt.verify(token, process.env.SECRETORPRIVATEKEY || 'KEYNOTEXIST');
        console.log("El codigo desencriptado: ");
        console.log(decoded);
        const usuario = await Usuario.findById(decoded).populate('application','nombre');
    
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        
        
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }
        
        //req.usuario =  usuario;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }

    console.log(token);
}

export default validarJWT;