import { Request, Response } from "express";

import { Constantes } from "../helpers";
import { IRol, IUpdateService } from "../interfaces";
import { Rol } from "../models";


export const rolNuevo = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion } = req.body;
        
        const rol: IRol = { 
            nombre, 
            descripcion
        }

        const rolSaved = await Rol.saveRol(rol);

        if(rolSaved){
            res.json({
                messsage: 'rolNuevo - Rol almacenada correctamente',
                rol: rolSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'rolNuevo - Ocurrió un error durante la creación del Rol',
                rol: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            rol: null,
            hasError:true
        });                 
    }
}

export const rolObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const rol = await Rol.getRol(id);

        if(rol){
            res.json({
                messsage: 'rolObtener - Rol encontrado',
                rol: rol,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'rolObtener - Ocurrió un error durante la busqueda del Rol',
                rol: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            rol: null,
            hasError:true
        });                 
    }
}

export const rolListar = async (req: Request, res: Response) => {

    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, rol] = await Rol.getRoles(desde, limite, estado);

        if(rol){
            res.json({
                messsage: 'rolListar - Roles encontradas',
                total: total,
                rol: rol,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'rolListar - Ocurrió un error durante la busqueda de Roles',
                total: 0,
                rol: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            rol: null,
            hasError:true
        });                 
    }
}

export const rolActualizar = async (req: Request, res: Response) => {
    try {

        const { id, nombre, descripcion } = req.body;

        const rol: IRol = { 
            _id: id,
            nombre, 
            descripcion
        }       
        
        const service: IUpdateService = await Rol.updateRol(rol);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'rolActualizar - Rol actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'rolActualizar - Ocurrió un error durante la actualizacion del Rol',
                hasError:true
            }); 
        }         
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            hasError:false
        });                 
    }
}

export const rolEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Rol.deleteRol(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'rolEliminar - Rol eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'rolEliminar - Ocurrió un error durante la eliminacion del Rol',
                hasError:true
            }); 
        }         
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            hasError:true
        });                 
    }
}