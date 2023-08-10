import { Model, Schema, model } from "mongoose";
import { IProducto } from "../interfaces";

type ProductoModel = Model<IProducto, {}>;

const ProductoSchema = new Schema<IProducto, ProductoModel>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    categoria:[{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    }],   
    codigo:{
        type: String
    },
    codigo_sunat:{
        type: String
    },      
    descuento:{
        type: Number,
        default: 0
    },    
    descripcion:{
        type: String,
        required: [true, 'La descripcion de la categoria es obligatoria']
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },  
    estado:{
        type: Boolean, 
        default: true
    },    
    precio_unitario:{
        type: Number,
        default: 0
    },
    unidad_medida:{
        type: String,
        default: "NIU"
    },      
    valor_unitario:{
        type: Number,
        default: 0
    },
})

ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Producto', ProductoSchema)