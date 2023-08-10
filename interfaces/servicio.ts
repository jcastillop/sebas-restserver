import { Document, Schema } from 'mongoose';

export interface IServicio extends Document{
    codigo: string;
    descripcion: string;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
    nombre: string;
    productos: Schema.Types.ObjectId;
}