import { Model, Schema, model } from "mongoose";
import { ICliente} from "../interfaces";

type ClienteModel = Model<ICliente, {}>;

const ClienteSchema = new Schema<ICliente, ClienteModel>({
    tipo_documento:{
        type: Number,
        required: [true, 'El tipo de documento es obligatorio']
    },    
    numero_documento:{
        type: String,
        required: [true, 'El numero de documento es obligatorio']
    },      
    nombre_comercial:{
        type: String
    },
    razon_social:{
        type: String,
        required: [true, 'La razon socialde la empresa es obligatorio']
    },
    ubigeo:{
        type: String
    },   
    direccion:{
        type: String
    },         
    estado:{
        type: Boolean, 
        default: true
    },        
})

ClienteSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Customer', ClienteSchema)