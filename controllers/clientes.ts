import { Request, Response } from "express";
import { Cliente, EmpresaCliente } from "../models";
import { ICliente } from '../interfaces/cliente';
import { IEmpresaCliente, IUpdateService } from "../interfaces";
import { Constantes } from "../helpers";

export const clienteNuevo = async (req: Request, res: Response) => {

    try {
        
        const {id_empresa, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion} = req.body;

        const cliente : ICliente = {
            tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion
        }

        const clienteSaved = await Cliente.saveCliente(cliente);

        if(clienteSaved){
            //clienteSaved.id
            const empresa_cliente : IEmpresaCliente = {
                empresa: id_empresa,
                cliente: clienteSaved.id,
            }

            const empresaClienteSaved = await EmpresaCliente.saveEmpresaCliente(empresa_cliente)

            if(empresaClienteSaved){
                res.json({
                    messsage: 'clienteNuevo - Cliente almacenado correctamente',
                    cliente: clienteSaved,
                    hasError:false
                }); 
            }else{
                res.json({
                    messsage: 'EmpresaClienteNuevo - Ocurrió un error durante la creación de la EmpresaCliente',
                    cliente: clienteSaved,
                    hasError:false
                }); 
            }

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

export const clienteObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const cliente = await Cliente.getCliente(id);

        if(cliente){
            res.json({
                messsage: 'clienteObtener - Cliente encontrado',
                cliente: cliente,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteObtener - Ocurrió un error durante la busqueda del Cliente',
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

export const clienteBuscarPorDocumento = async (req: Request, res: Response) => {
    try {
        const { valor } = req.body;
        
        const cliente = await Cliente.getClienteByDocument(valor);

        if(cliente){
            res.json({
                messsage: 'clienteObtener - Cliente encontrado',
                cliente: cliente,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteObtener - No se encontró cliente',
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
        const { estado = true, limite = 10, desde = 0 } = req.body;

        const [total, cliente] = await Cliente.getClientes(desde, limite, estado);

        if(cliente){
            res.json({
                messsage: 'clienteListar - Clientes encontrados',
                total: total,
                cliente: cliente,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteListar - Ocurrió un error durante la busqueda de Clientes',
                total: 0,
                cliente: null,
                hasError:true
            }); 
        }

    } catch (error) {
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            hasError:true
        });  
    }
}

export const clienteActualizar = async (req: Request, res: Response) => {
    try {
        const { id, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion} = req.body;

        const cliente : ICliente = {
            _id: id, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion
        }

        const service: IUpdateService = await Cliente.updateCliente(cliente);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'clienteActualizar - Cliente actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteActualizar - Ocurrió un error durante la actualizacion del Cliente',
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

export const clienteEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Cliente.deleteCliente(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'clienteEliminar - Cliente eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'clienteEliminar - Ocurrió un error durante la eliminacion del Cliente',
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