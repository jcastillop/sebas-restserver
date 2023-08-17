import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Usuario } from "../models";
//const jwt = require('jsonwebtoken');

declare module "jsonwebtoken" {
    export interface JwtPayload {
        uid: string
    }
}

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'El token no existe en la peticion'
        });
    }

    try {

        const decoded  = <jwt.JwtPayload>jwt.verify(token, process.env.SECRETORPRIVATEKEY || 'KEYNOTEXIST');
        
        const usuario = await Usuario.getUsuario(decoded.uid)
    
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