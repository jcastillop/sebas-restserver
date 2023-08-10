import { Model, Schema, model } from "mongoose";
import { IServicio } from "../interfaces";

type ServicioModel = Model<IServicio, {}>;

const ServicioSchema = new Schema<IServicio, ServicioModel>({
    codigo:{
        type: String,
        required: [true, 'El codigo del servicio es obligatorio']
    },
    descripcion:{
        type: String
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
    nombre:{
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },    
    productos:[{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    }],
})

ServicioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Servicio', ServicioSchema)