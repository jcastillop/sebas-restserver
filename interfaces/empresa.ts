import { Document } from 'mongoose';

export interface IEmpresa extends Document{
    nombre_comercial: string;
    razon_social: string;
    ruc: string;
    ubigeo: string;
    direccion: string;
    estado: boolean;
}