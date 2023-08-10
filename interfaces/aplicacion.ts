import { Document, Schema } from 'mongoose';

export interface IAplicacion extends Document{
    nombre: string;
    descripcion: string;
    suppliers: Schema.Types.ObjectId;
    estado?: boolean;
}