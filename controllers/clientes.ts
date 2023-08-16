import { Request, Response } from "express";
import { Cliente } from "../models";

export const clienteNuevo = async (req: Request, res: Response) => {
    try {
        const {tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion} = req.body;
        const clienteSaved = new Cliente({tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion});
        if(clienteSaved){
            res.json({
                messsage: 'clienteNuevo - Cliente almacenado correctamente',
                cliente: clienteSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteNuevo - Ocurrió un error durante la creación del cliente',
                cliente: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            cliente: null,
            hasError:true
        });                 
    }
}

export const clienteListar = async (req: Request, res: Response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const { empresa } = req.body;
        var parametros = {}
        parametros = { estado : true }
        if(empresa){
            parametros = { estado : true, empresa: empresa }
        }
        const [total, clientes] = await Promise.all([
            Cliente.countDocuments(parametros),
            Cliente.find(parametros)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);    
        res.json({
            total, 
            clientes
        });
    } catch (error) {
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            hasError:true
        });  
    }
}

export const clienteActualizar = async (req: Request, res: Response) => {
    try {
        const {tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion} = req.body;
        const clienteSaved = new Cliente({tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion});
        if(clienteSaved){
            res.json({
                messsage: 'clienteNuevo - Cliente almacenado correctamente',
                cliente: clienteSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteNuevo - Ocurrió un error durante la creación del cliente',
                cliente: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            cliente: null,
            hasError:true
        });                 
    }
}