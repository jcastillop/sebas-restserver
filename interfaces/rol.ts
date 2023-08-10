import { Document } from 'mongoose';

export interface IRol extends Document{
    nombre: string;
    descripcion: string;
    estado?: boolean;
}