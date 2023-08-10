import { Model, Schema, model } from "mongoose";
import { ICategoria } from "../interfaces";

type CategoriaModel = Model<ICategoria, {}>;

const CategoriaSchema = new Schema<ICategoria, CategoriaModel>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
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
})

CategoriaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Categoria', CategoriaSchema)