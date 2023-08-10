import { Schema } from "mongoose";

export interface IUsuario {
    usuario: string;
    nombre: string;
    correo: string;
    password: string;
    img: string;
    rol: string;
    applications: Schema.Types.ObjectId;
    rols: Schema.Types.ObjectId;
    estado: boolean;
}