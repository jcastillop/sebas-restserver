import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";

export interface IRol{
    _id?: Schema.Types.ObjectId;
    nombre: string;
    descripcion: string;
    estado?: boolean;
}
export interface IRolMethods {

}
export interface RolModel extends Model<IRol, {}, IRolMethods> {
    saveRol(rol: IRol): Promise<HydratedDocument<IRol>>;
    getRol(id: Schema.Types.ObjectId): Promise<HydratedDocument<IRol>>;
    getRoles(skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IRol[]>>;
    updateRol(rol: IRol): Promise<HydratedDocument<IRol, IUpdateService>>;
    deleteRol(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;
}