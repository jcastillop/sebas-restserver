import { Request, Response } from "express";

import { Constantes } from "../helpers";
import { Empresa } from "../models";
import { IEmpresa, IUpdateService } from "../interfaces";

export const empresaNuevo = async (req: Request, res: Response) => {
    try {
        const { nombre_comercial, razon_social, ruc, ubigeo, direccion } = req.body;
        
        const empresa: IEmpresa = { 
            nombre_comercial, 
            razon_social, 
            ruc, 
            ubigeo, 
            direccion
        }

        const empresaSaved = await Empresa.saveEmpresa(empresa);

        if(empresaSaved){
            res.json({
                messsage: 'empresaNuevo - Empresa almacenada correctamente',
                empresa: empresaSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'empresaNuevo - Ocurrió un error durante la creación de la Empresa',
                empresa: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            empresa: null,
            hasError:true
        });                 
    }
}

export const empresaObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const empresa = await Empresa.getEmpresa(id);

        if(empresa){
            res.json({
                messsage: 'empresaObtener - Empresa encontrada',
                empresa: empresa,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'empresaObtener - Ocurrió un error durante la busqueda de la Empresa',
                empresa: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            empresa: null,
            hasError:true
        });                 
    }
}

export const empresaListar = async (req: Request, res: Response) => {

    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, empresa] = await Empresa.getEmpresas(desde, limite, estado);

        if(empresa){
            res.json({
                messsage: 'empresaListar - Empresas encontradas',
                total: total,
                empresa: empresa,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'empresaListar - Ocurrió un error durante la busqueda de Empresas',
                total: 0,
                empresa: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            empresa: null,
            hasError:true
        });                 
    }
}

export const empresaActualizar = async (req: Request, res: Response) => {
    try {

        const { id, nombre_comercial, razon_social, ruc, ubigeo, direccion } = req.body;

        const empresa: IEmpresa = { 
            _id: id,
            nombre_comercial, 
            razon_social, 
            ruc, 
            ubigeo, 
            direccion
        }       
        
        const service: IUpdateService = await Empresa.updateEmpresa(empresa);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'empresaActualizar - Empresa actualizada',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'empresaActualizar - Ocurrió un error durante la actualizacion de la Empresa',
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

export const empresaEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Empresa.deleteEmpresa(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'empresaEliminar - Empresa eliminada',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'empresaEliminar - Ocurrió un error durante la eliminacion de la Empresa',
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