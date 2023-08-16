import { Model, Schema, model } from "mongoose";

interface IAplicacionEmpresa {
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    descripcion: string;
    estado: boolean;
}

const AplicacionEmpresaSchema = new Schema<IAplicacionEmpresa>({
    aplicacion:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    },  
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },       
    descripcion:{
        type: String
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

AplicacionEmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'ApplicationSupplier', AplicacionEmpresaSchema)