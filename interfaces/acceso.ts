import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IAcceso {
    _id?: Schema.Types.ObjectId;
    fecha: string;
    usuario: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
}
export interface IAccesoMethods {
    fecha(): string;
    fechaHora(): string;
}
export interface AplicacionModel extends Model<IAcceso, {}, IAccesoMethods> {
    saveAcceso(acceso: IAcceso): Promise<HydratedDocument<IAcceso>>;
    getAcceso(id: Schema.Types.ObjectId): Promise<HydratedDocument<IAcceso>>;
    getAccesos(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IAcceso[]>>;
    updateAcceso(acceso: IAcceso): Promise<HydratedDocument<IAcceso, IUpdateService>>;
    deleteAcceso(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}
