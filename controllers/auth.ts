import { Request, Response } from "express";
import { compareSync } from "bcrypt";

import Usuario from "../models/usuario";
import generarJWT from "../helpers/generar-jwt";

export const login = async (req: Request, res: Response) => {

    const {user, password} = req.body

    try {
        const usuario = await Usuario.findOne({ usuario: user })
            .populate("rols")
            .populate({
                path : "applications",
                populate: { path: 'suppliers' }
            });

        if(!usuario) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - usuario no existe'
            })
        }
        //Usuario activo
        if(!usuario?.estado) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - usuario inactivo'
            })
        }
        //Validar contrasena
        const isMatch = compareSync(password, usuario?.password || "");
        if (!isMatch) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - password no coincide'
            })
        }
        //Generar Jwt
        const token = await generarJWT(usuario.id);
        
        return res.json({
            usuario,
            token
        })                    
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })        
    }
}

export const validarTokenUsuario = async (req: Request, res: Response) => {

    const { id } = req.body

    const token = await generarJWT( id );

    res.json({
        usuario: id,
        token: token,
    })
}
