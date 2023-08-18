import { Request, Response } from "express";

import { Constantes } from "../helpers";
import { IServicio, IServicioProducto, IUpdateService } from "../interfaces";
import { Servicio, ServicioProducto } from "../models";

export const servicioNuevo = async (req: Request, res: Response) => {
    try {
        const { codigo, nombre, descripcion, aplicacion, empresa } = req.body;
        
        const servicio: IServicio = { 
            codigo,
            nombre, 
            descripcion,
            aplicacion, 
            empresa
        }

        const servicioSaved = await Servicio.saveServicio(servicio);

        if(servicioSaved){
            res.json({
                messsage: 'servicioNuevo - Servicio almacenado correctamente',
                servicio: servicioSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioNuevo - Ocurrió un error durante la creación del Servicio',
                servicio: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            servicio: null,
            hasError:true
        });                 
    }
}

export const servicioObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const servicio = await Servicio.getServicio(id);

        if(servicio){
            res.json({
                messsage: 'servicioObtener - Servicio encontrado',
                servicio: servicio,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioObtener - Ocurrió un error durante la busqueda del Servicio',
                servicio: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            servicio: null,
            hasError:true
        });                 
    }
}

export const servicioListar = async (req: Request, res: Response) => {

    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, servicio] = await Servicio.getServicios(desde, limite, estado);

        if(servicio){
            res.json({
                messsage: 'servicioListar - Servicios encontradas',
                total: total,
                servicio: servicio,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioListar - Ocurrió un error durante la busqueda de Servicios',
                total: 0,
                servicio: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            servicio: null,
            hasError:true
        });                 
    }
}

export const servicioActualizar = async (req: Request, res: Response) => {
    try {

        const { id, codigo, nombre, descripcion, aplicacion, empresa } = req.body;

        const servicio: IServicio = { 
            _id: id,
            codigo,
            nombre, 
            descripcion,
            aplicacion, 
            empresa
        }       
        
        const service: IUpdateService = await Servicio.updateServicio(servicio);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'servicioActualizar - Servicio actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioActualizar - Ocurrió un error durante la actualizacion del Servicio',
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

export const servicioEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Servicio.deleteServicio(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'servicioEliminar - Servicio eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioEliminar - Ocurrió un error durante la eliminacion del Servicio',
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

export const servicioProductoNuevo = async (req: Request, res: Response) => {
    try {
        const { servicio, producto, precio, cantidad, descripcion } = req.body;
        
        const servicio_producto: IServicioProducto = { 
            servicio,
            producto, 
            precio,
            cantidad, 
            descripcion
        }

        const servicioProducto = await ServicioProducto.saveServicioProducto(servicio_producto);

        if(servicioProducto){
            res.json({
                messsage: 'servicioProductoNuevo - ServicioProducto almacenado correctamente',
                servicioProducto: servicioProducto,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioProductoNuevo - Ocurrió un error durante la creación del ServicioProducto',
                servicioProducto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            servicioProducto: null,
            hasError:true
        });                 
    }
}

export const servicioProductoObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const servicioProducto = await ServicioProducto.getServicioProducto(id);

        if(servicioProducto){
            res.json({
                messsage: 'servicioProductoObtener - servicioProducto encontrado',
                servicioProducto: servicioProducto,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioProductoObtener - Ocurrió un error durante la busqueda del servicioProducto',
                servicioProducto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            servicio_producto: null,
            hasError:true
        });                 
    }
}

export const servicioProductoListar = async (req: Request, res: Response) => {

    try {
        const { servicio, estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, servicioProducto] = await ServicioProducto.getServiciosProductos(servicio, desde, limite, estado);

        if(servicioProducto){
            res.json({
                messsage: 'servicioProductoListar - servicioProducto encontradas',
                total: total,
                servicioProducto: servicioProducto,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioProductoListar - Ocurrió un error durante la busqueda de servicioProducto',
                total: 0,
                servicioProducto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            servicio: null,
            hasError:true
        });                 
    }
}

export const servicioProductoActualizar = async (req: Request, res: Response) => {
    try {

        const { id, precio, cantidad, descripcion } = req.body;

        const servicio_producto: IServicioProducto = { 
            _id: id,
            precio,
            cantidad, 
            descripcion
        }       
        
        const service: IUpdateService = await ServicioProducto.updateServicioProducto(servicio_producto);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'servicioProductoActualizar - ServicioProducto actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioProductoActualizar - Ocurrió un error durante la actualizacion del ServicioProducto',
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

export const servicioProductoEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await ServicioProducto.deleteServicioProducto(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'servicioProductoEliminar - ServicioProducto eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'servicioProductoEliminar - Ocurrió un error durante la eliminacion del ServicioProducto',
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