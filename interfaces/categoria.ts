import { Document, Schema } from 'mongoose';

export interface ICategoria extends Document{
    nombre: string;
    descripcion: string;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
}