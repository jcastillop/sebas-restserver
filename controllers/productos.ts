import { Request, Response } from "express";
import { Producto } from "../models";
import { IProducto, IUpdateService } from "../interfaces";
import { Constantes } from "../helpers";

export const productoNuevo = async (req: Request, res: Response) => {
    try {
        const { nombre, empresa, aplicacion, categoria, codigo, codigo_sunat, descuento, descripcion, precio_unitario, unidad_medida, valor_unitario } = req.body;
        
        const producto: IProducto = { 
            nombre, 
            empresa, 
            aplicacion, 
            categoria, 
            codigo, 
            codigo_sunat, 
            descuento, 
            descripcion, 
            precio_unitario, 
            unidad_medida, 
            valor_unitario 
        }

        const productoSaved = await Producto.saveProducto(producto);

        if(productoSaved){
            res.json({
                messsage: 'productoNuevo - Producto almacenado correctamente',
                producto: productoSaved,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'productoNuevo - Ocurrió un error durante la creación del producto',
                producto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            producto: null,
            hasError:true
        });                 
    }
}

export const productoObtener = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const producto = await Producto.getProducto(id);

        if(producto){
            res.json({
                messsage: 'productoObtener - Producto encontrado',
                producto: producto,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'productoObtener - Ocurrió un error durante la busqueda del producto',
                producto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            producto: null,
            hasError:true
        });                 
    }
}

export const productoListar = async (req: Request, res: Response) => {

    try {
        const { empresa, aplicacion, estado = true, limite = 5, desde = 0 } = req.body;
        
        const [total, producto] = await Producto.getProductos(aplicacion, empresa, desde, limite, estado);

        if(producto){
            res.json({
                messsage: 'productoListar - Productos encontrados',
                total: total,
                producto: producto,
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'productoListar - Ocurrió un error durante la busqueda del productos',
                total: 0,
                producto: null,
                hasError:true
            }); 
        }
       
    } catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${ error }`,
            total: 0,
            producto: null,
            hasError:true
        });                 
    }
}

export const productoActualizar = async (req: Request, res: Response) => {
    try {

        const { id, nombre, empresa, aplicacion, categoria, codigo, codigo_sunat, descuento, descripcion, precio_unitario, unidad_medida, valor_unitario } = req.body;

        const producto: IProducto = { 
            _id: id, 
            nombre, 
            empresa, 
            aplicacion, 
            categoria, 
            codigo, 
            codigo_sunat, 
            descuento, 
            descripcion, 
            precio_unitario, 
            unidad_medida, 
            valor_unitario 
        }        
        
        const service: IUpdateService = await Producto.updateProducto(producto);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'productoActualizar - Producto actualizado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'productoActualizar - Ocurrió un error durante la actualizacion del producto',
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

export const productoEliminar = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        
        const service: IUpdateService = await Producto.deleteProducto(id);

        if(service.matchedCount == Constantes.MONGOOSE_UPDATE_SUCCESS){
            res.json({
                messsage: 'productoEliminar - Producto eliminado',
                hasError:false
            }); 
        }else{
            res.json({
                messsage: 'productoEliminar - Ocurrió un error durante la eliminacion del producto',
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