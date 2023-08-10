import { Model, Schema, model } from "mongoose";
import { IRol } from "../interfaces";

type RolModel = Model<IRol, {}>;

const RolSchema = new Schema<IRol, RolModel>({
    nombre:{
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion del rol es obligatoria']
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

RolSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Rol', RolSchema)