import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IEmpresa{
    _id?: Schema.Types.ObjectId;
    nombre_comercial: string;
    razon_social: string;
    ruc: string;
    ubigeo: string;
    direccion: string;
    estado?: boolean;
}
export interface IEmpresaMethods {

}
export interface EmpresaModel extends Model<IEmpresa, {}, IEmpresaMethods> {
    saveEmpresa(empresa: IEmpresa): Promise<HydratedDocument<IEmpresa>>;
    getEmpresa(id: Schema.Types.ObjectId): Promise<HydratedDocument<IEmpresa>>;
    getEmpresas(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IEmpresa[]>>;
    updateEmpresa(empresa: IEmpresa): Promise<HydratedDocument<IEmpresa, IUpdateService>>;
    deleteEmpresa(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}