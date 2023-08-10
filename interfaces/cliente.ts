import { Document } from 'mongoose';

export interface ICliente extends Document{
    tipo_documento: Number;
    numero_documento: string;
    nombre_comercial: string;
    razon_social: string;
    ubigeo: string;
    direccion: string;
    estado: boolean;
}