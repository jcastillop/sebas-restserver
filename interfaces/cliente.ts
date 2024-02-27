import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface ICliente{
    _id?: Schema.Types.ObjectId;
    tipo_documento: Number;
    numero_documento: string;
    nombre_comercial: string;
    razon_social: string;
    ubigeo: string;
    direccion: string;
    estado?: boolean;
}
export interface IClienteMethods {

}
export interface ClienteModel extends Model<ICliente, {}, IClienteMethods> {
    saveCliente(cliente: ICliente): Promise<HydratedDocument<ICliente>>;
    getCliente(id: Schema.Types.ObjectId): Promise<HydratedDocument<ICliente>>;
    getClienteByDocument(valor:string): Promise<HydratedDocument<ICliente>>;
    getClientes(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<ICliente[]>>;
    updateCliente(cliente: ICliente): Promise<HydratedDocument<ICliente, IUpdateService>>;
    deleteCliente(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}