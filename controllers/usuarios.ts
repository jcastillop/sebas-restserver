import { Request, Response } from "express";
import { Usuario } from "../models";
import { IUpdateService, IUsuario } from "../interfaces";
import { Constantes } from "../helpers";

export const usuarioNuevo = async (req: Request, res: Response) => {
    try {    
        const {usuario, nombre, correo, password, rol, aplicacion, empresa} = req.body;

        const user: IUsuario = { 
            usuario, 
            nombre, 
            correo, 
            password, 
            rol, 
            aplicacion, 
            empresa
        }

        const usuarioSaved = await Usuario.saveUsuario(user);

        if(usuarioSaved){
            res.json({
                messsage: 'usuarioNuevo - Usuario almacenado correctamente',
                usuario: usuarioSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'usuarioNuevo - Ocurrió un error durante la creación del usuario',
                usuario: null,
                hasError:true
            }); 
        }
   
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            usuario: null,
            hasError:true
        });                 
    }
}

export const usuarioObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const usuario = await Usuario.getUsuario(id);

        if(usuario){
            res.json({
                messsage: 'usuarioObtener - Usuario encontrado',
                usuario: usuario,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'usuarioObtener - Ocurrió un error durante la busqueda del Usuario',
                usuario: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            usuario: null,
            hasError:true
        });                 
    }
}

export const usuarioListar = async (req: Request, res: Response) => {

    console.log("usuario listar")

    try {
        const { empresa, aplicacion, estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, usuario] = await Usuario.getUsuarios(aplicacion, empresa, desde, limite, estado);

        if(usuario){
            res.json({
                messsage: 'usuarioListar - Usuarios encontrados',
                total: total,
                usuario: usuario,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'usuarioListar - Ocurrió un error durante la busqueda del Usuarios',
                total: 0,
                usuario: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            usuario: null,
            hasError:true
        });                 
    }
    
}

export const usuarioActualizar = async (req: Request, res: Response) => {

    try {

        const { id, nombre, correo, rol, aplicacion, empresa} = req.body;

        const user: IUsuario = { 
            _id: id, 
            nombre, 
            correo, 
            rol, 
            aplicacion, 
            empresa
        }        
        
        const service: IUpdateService = await Usuario.updateUsuario(user);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'usuarioActualizar - Usuario actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'usuarioActualizar - Ocurrió un error durante la actualizacion del Usuario',
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

export const usuarioEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Usuario.deleteUsuario(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'usuarioEliminar - Usuario eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'usuarioEliminar - Ocurrió un error durante la eliminacion del Usuario',
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