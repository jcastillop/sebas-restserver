import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IComprobanteMaster{
    _id?: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;      
    tipo_comprobante: string;
    numeracion_comprobante: string;
    fecha_emision: Date;
    tipo_moneda: string;
    tipo_operacion: string;
    tipo_nota: string;
    tipo_documento_afectado: string;
    fecha_documento_afectado: Date;
    numeracion_documento_afectado: string;
    motivo_documento_afectado: string;
    total_gravadas: Number;
    total_igv: Number;
    total_venta: Number;
    monto_letras: string;
    cadena_para_codigo_qr: string;
    codigo_hash: string;
    pdf_bytes: string;
    url: string;
    errors: string;
    pago_tarjeta: Number;
    pago_efectivo: Number;
    pago_yape: Number;
    estado?: boolean;
}
export interface IComprobanteMasterMethods {
    //saveProducto(): (producto: IProducto) => Promise<{ hasError: boolean; producto: IProducto; }>;
    //getProducto(): (id: Schema.Types.ObjectId) => Promise<{ hasError: boolean; producto: IProducto; }>;
}
export interface ComprobanteMasterModel extends Model<IComprobanteMaster, {}, IComprobanteMasterMethods> {
    saveComprobanteMaster(comprobante: IComprobanteMaster): Promise<HydratedDocument<IComprobanteMaster>>;
    getComprobanteMaster(id: Schema.Types.ObjectId): Promise<HydratedDocument<IComprobanteMaster>>;
    getComprobantesMaster(aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IComprobanteMaster[]>>;
    updateComprobantesMaster(comprobante: IComprobanteMaster): Promise<HydratedDocument<IComprobanteMaster, IUpdateService>>;
    deleteComprobantesMaster(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}