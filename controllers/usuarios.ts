import { Request, Response } from "express";

import Usuario from "../models/usuario";

export const usuarioNuevo = async (req: Request, res: Response) => {
    const {usuario, nombre, correo, password, rol, application} = req.body;

    const usrSaved = new Usuario({usuario, nombre, correo, password, rol, application});
    //encriptar la contrasena
    await usrSaved.save();

    res.json({
        msg: 'post API - usuariosPosts',
        usrSaved
    });
}