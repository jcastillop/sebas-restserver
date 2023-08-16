import { Schema } from "mongoose";

export interface IUsuario {
    usuario: string;
    nombre: string;
    correo: string;
    password: string;
    img: string;
    rol: Schema.Types.ObjectId;
    application: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    estado: boolean;
    
}