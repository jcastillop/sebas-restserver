import { Document, Schema } from 'mongoose';

export interface IProducto extends Document{
    nombre: string;
    categoria: Schema.Types.ObjectId;
    codigo: string;
    codigo_sunat: string;
    descuento: Number;
    descripcion: string;
    empresa: Schema.Types.ObjectId;
    estado?: boolean;
    precio_unitario: Number;
    unidad_medida: string;
    valor_unitario: Number;
}