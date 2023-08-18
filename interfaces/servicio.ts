import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IServicio {
    _id?: Schema.Types.ObjectId;
    codigo: string;
    nombre: string;
    descripcion: string;
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
}
export interface IServicioMethods {

}
export interface ServicioModel extends Model<IServicio, {}, IServicioMethods> {
    saveServicio(servicio: IServicio): Promise<HydratedDocument<IServicio>>;
    getServicio(id: Schema.Types.ObjectId): Promise<HydratedDocument<IServicio>>;
    getServicios(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IServicio[]>>;
    updateServicio(servicio: IServicio): Promise<HydratedDocument<IServicio, IUpdateService>>;
    deleteServicio(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}