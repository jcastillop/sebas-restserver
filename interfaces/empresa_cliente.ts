import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IEmpresaCliente {
    _id?: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    cliente: Schema.Types.ObjectId;
    estado?: boolean;
}
export interface IEmpresaClienteMethods {

}
export interface EmpresaClienteModel extends Model<IEmpresaCliente, {}, IEmpresaClienteMethods> {
    saveEmpresaCliente(empresa_cliente: IEmpresaCliente): Promise<HydratedDocument<IEmpresaCliente>>;
    getEmpresaCliente(id: Schema.Types.ObjectId): Promise<HydratedDocument<IEmpresaCliente>>;
    getEmpresasClientes(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IEmpresaCliente[]>>;
    updateEmpresasClientes(empresa_cliente: IEmpresaCliente): Promise<HydratedDocument<IEmpresaCliente, IUpdateService>>;
    deleteEmpresasClientes(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}