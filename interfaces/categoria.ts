import { Document, Schema } from 'mongoose';

export interface ICategoria{
    nombre: string;
    descripcion: string;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
}