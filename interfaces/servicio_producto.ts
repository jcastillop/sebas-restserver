import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IServicioProducto {
    _id?: Schema.Types.ObjectId;
    servicio?: Schema.Types.ObjectId;
    producto?: Schema.Types.ObjectId;
    precio: number;
    cantidad: number;
    descripcion: string;
    estado?: boolean;
}
export interface IServicioProductoMethods {

}
export interface ServicioProductoModel extends Model<IServicioProducto, {}, IServicioProductoMethods> {
    saveServicioProducto(servicio_producto: IServicioProducto): Promise<HydratedDocument<IServicioProducto>>;
    getServicioProducto(id: Schema.Types.ObjectId): Promise<HydratedDocument<IServicioProducto>>;
    getServiciosProductos(servicio: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IServicioProducto[]>>;
    updateServicioProducto(servicio_producto: IServicioProducto): Promise<HydratedDocument<IServicioProducto, IUpdateService>>;
    deleteServicioProducto(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}