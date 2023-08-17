import { HydratedDocument, Model, Schema } from "mongoose";
import { IUpdateService } from ".";


export interface IUsuario {
    _id?: Schema.Types.ObjectId;
    usuario?: string;
    nombre: string;
    correo: string;
    password?: string;
    img?: string;
    rol: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
}
export interface IUsuarioMethods {
    //saveProducto(): (producto: IProducto) => Promise<{ hasError: boolean; producto: IProducto; }>;
    //getProducto(): (id: Schema.Types.ObjectId) => Promise<{ hasError: boolean; producto: IProducto; }>;
}
export interface UsuarioModel extends Model<IUsuario, {}, IUsuarioMethods> {
    saveUsuario(usuario: IUsuario): Promise<HydratedDocument<IUsuario>>;
    getUsuario(id: string): Promise<HydratedDocument<IUsuario>>;
    getUsuarios(aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean): Promise<HydratedDocument<IUsuario[]>>;
    updateUsuario(usuario: IUsuario): Promise<HydratedDocument<IUsuario, IUpdateService>>;
    deleteUsuario(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUpdateService>>;    
}
