import { Request, Response } from "express";
import { Aplicacion } from "../models";
import { IAplicacion, IUpdateService } from "../interfaces";
import { Constantes } from "../helpers";

export const aplicacionNuevo = async (req: Request, res: Response) => {

    try {

        const { nombre, descripcion } = req.body;

        const aplicacion: IAplicacion = { 
            nombre, 
            descripcion
        }

        const aplicacionSaved = await Aplicacion.saveAplicacion(aplicacion);

        if(aplicacionSaved){
            res.json({
                messsage: 'aplicacionNuevo - Aplicacion almacenado correctamente',
                aplicacion: aplicacionSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'aplicacionNuevo - Ocurrió un error durante la creación de la Aplicacion',
                aplicacion: null,
                hasError:true
            }); 
        }        
    } catch (error) {
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            aplicacion: null,
            hasError:true
        });        
    }

}

export const aplicacionObtener = async (req: Request, res: Response) => {

    try {
        const { id } = req.body;
        
        const aplicacion = await Aplicacion.getAplicacion(id);

        if(aplicacion){
            res.json({
                messsage: 'aplicacionObtener - Aplicacion encontrado',
                aplicacion: aplicacion,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'aplicacionObtener - Ocurrió un error durante la busqueda de la Aplicacion',
                aplicacion: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            aplicacion: null,
            hasError:true
        });                 
    }

}

export const aplicacionListar = async (req: Request, res: Response) => {

    
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, aplicacion] = await Aplicacion.getAplicaciones(desde, limite, estado);

        if(aplicacion){
            res.json({
                messsage: 'aplicacionListar - Aplicaciones encontradas',
                total: total,
                aplicacion: aplicacion,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'aplicacionListar - Ocurrió un error durante la busqueda de Aplicaciones',
                total: 0,
                aplicacion: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            aplicacion: null,
            hasError:true
        });                 
    }

}
export const aplicacionActualizar = async (req: Request, res: Response) => {

    try {

        const { id, nombre, descripcion } = req.body;

        const aplicacion: IAplicacion = { 
            _id: id, 
            nombre, 
            descripcion
        }
        
        const service: IUpdateService = await Aplicacion.updateAplicacion(aplicacion);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'aplicacionActualizar - Aplicacion actualizada',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'aplicacionActualizar - Ocurrió un error durante la actualizacion de la Aplicacion',
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
export const aplicacionEliminar = async (req: Request, res: Response) => {

    try {
        const { id } = req.body;
        
        const aplicacion: IUpdateService = await Aplicacion.deleteAplicacion(id);

        if(aplicacion.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'aplicacionEliminar - Aplicacion eliminada',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'aplicacionEliminar - Ocurrió un error durante la eliminacion de la Aplicacion',
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