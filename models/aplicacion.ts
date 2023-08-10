import { Model, Schema, model } from "mongoose";
import { IAplicacion} from "../interfaces";

type AplicacionModel = Model<IAplicacion, {}>;

const AplicacionSchema = new Schema<IAplicacion, AplicacionModel>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la aplicacion es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion de la aplicacion es obligatoria']
    },
    suppliers:[{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    }],     
    estado:{
        type: Boolean, 
        default: true
    },        
})

AplicacionSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Application', AplicacionSchema)