import { Request, Response } from "express";
import Categoria from "../models/categoria";

interface queryEmpresa {
    estado: boolean,
    empresa?: string | ""
}

export const categoriaNuevo = async (req: Request, res: Response) => {
    // const {usuario, nombre, correo, password, rol, application} = req.body;

    // const usrSaved = new Usuario({usuario, nombre, correo, password, rol, application});
    // //encriptar la contrasena
    // await usrSaved.save();

    res.json({
        msg: 'post API - usuariosPosts'
    });
}

export const categoriaListar = async (req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;
    const { empresa } = req.body;

    var parametros = {}
    parametros = { estado : true }

    if(empresa){
        parametros = { estado : true, empresa: empresa }
    }


    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(parametros),
        Categoria.find(parametros)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);    

    res.json({
        total, 
        categorias
    });
}

export const categoriaObtener = async (req: Request, res: Response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id );

    res.json(categoria);
}

export const categoriaActualizar = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { ...resto } = req.body;

    const categoria = await Categoria.findByIdAndUpdate( id, resto )

    res.json(categoria);
}

export const categoriaBorrar = async (req: Request, res: Response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado : false});

    res.json(categoria);
}