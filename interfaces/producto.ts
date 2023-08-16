import { HydratedDocument, Model, Schema, model } from "mongoose";
import { IUpdateService } from ".";
export interface IProducto{
    _id?: Schema.Types.ObjectId;
    nombre: string;
    empresa: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;    
    categoria: Schema.Types.ObjectId;
    codigo: string;
    codigo_sunat: string;
    descuento: Number;
    descripcion: string;
    precio_unitario: Number;
    unidad_medida: string;
    valor_unitario: Number;
    estado?: boolean;
}
export interface IProductoMethods {
    //saveProducto(): (producto: IProducto) => Promise<{ hasError: boolean; producto: IProducto; }>;
    //getProducto(): (id: Schema.Types.ObjectId) => Promise<{ hasError: boolean; producto: IProducto; }>;
}
export interface ProductoModel extends Model<IProducto, {}, IProductoMethods> {
    saveProducto(producto: IProducto): Promise<HydratedDocument<IProducto, IProductoMethods>>;
    getProducto(id: Schema.Types.ObjectId): Promise<HydratedDocument<IProducto, IProductoMethods>>;
    getProductos(aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IProducto[], IProductoMethods>>;
    updateProducto(producto: IProducto): Promise<HydratedDocument<IProducto, IProductoMethods>>;
    deleteProducto(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}