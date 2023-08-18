import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";
export interface IAplicacion {
    _id?: Schema.Types.ObjectId;
    nombre: string;
    descripcion: string;
    estado?: boolean;
}
export interface IAplicacionMethods {
    fullDescripcion(): string;
}
export interface AplicacionModel extends Model<IAplicacion, {}, IAplicacionMethods> {
    saveAplicacion(aplicacion: IAplicacion): Promise<HydratedDocument<IAplicacion>>;
    getAplicacion(id: Schema.Types.ObjectId): Promise<HydratedDocument<IAplicacion>>;
    getAplicaciones(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IAplicacion[]>>;
    updateAplicacion(aplicacion: IAplicacion): Promise<HydratedDocument<IAplicacion, IUpdateService>>;
    deleteAplicacion(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}
