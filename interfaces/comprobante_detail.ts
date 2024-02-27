import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IComprobanteDetail{
    _id?: Schema.Types.ObjectId;
    comprobante: Schema.Types.ObjectId;
    cantidad: Number;
    valor_unitario: Number;
    precio_unitario: Number;
    igv: Number;
    descripcion: string;
    codigo_producto: string;
    estado?: boolean;
}
export interface IComprobanteDetailMethods {
    //saveProducto(): (producto: IProducto) => Promise<{ hasError: boolean; producto: IProducto; }>;
    //getProducto(): (id: Schema.Types.ObjectId) => Promise<{ hasError: boolean; producto: IProducto; }>;
}
export interface ComprobanteMasterModel extends Model<IComprobanteDetail, {}, IComprobanteDetailMethods> {
    saveComprobanteDetail(comprobante: IComprobanteDetail): Promise<HydratedDocument<IComprobanteDetail>>;
    getComprobanteDetail(id: Schema.Types.ObjectId): Promise<HydratedDocument<IComprobanteDetail>>;
    getComprobantesDetail(aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IComprobanteDetail[]>>;
    updateComprobantesDetail(comprobante: IComprobanteDetail): Promise<HydratedDocument<IComprobanteDetail, IUpdateService>>;
    deleteComprobantesDetail(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}