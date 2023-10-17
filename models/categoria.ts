import { Model, Schema, model } from "mongoose";

interface ICategoria extends Document{
    nombre: string;
    codigo: string;
    descripcion: string;
    empresa: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
    estado: boolean;
}

const CategoriaSchema = new Schema<ICategoria>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    codigo:{
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
    aplicacion:{
        type: Schema.Types.ObjectId,
        ref:'Application',
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

export default model( 'Categorie', CategoriaSchema)