import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IAplicacionEmpresa {
    _id?: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    descripcion: string;
    estado?: boolean;
}
export interface IAplicacionEmpresaMethods {

}
export interface AplicacionEmpresaModel extends Model<IAplicacionEmpresa, {}, IAplicacionEmpresaMethods> {
    saveAplicacionEmpresa(aplicacion_empresa: IAplicacionEmpresa): Promise<HydratedDocument<IAplicacionEmpresa>>;
    getAplicacionEmpresa(id: Schema.Types.ObjectId): Promise<HydratedDocument<IAplicacionEmpresa>>;
    getAplicacionesEmpresas(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IAplicacionEmpresa[]>>;
    updateAplicacionEmpresa(aplicacion_empresa: IAplicacionEmpresa): Promise<HydratedDocument<IAplicacionEmpresa, IUpdateService>>;
    deleteAplicacionEmpresa(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}