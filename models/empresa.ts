import { Model, Schema, model } from "mongoose";
import { IEmpresa} from "../interfaces";

type EmpresaModel = Model<IEmpresa, {}>;

const EmpresaSchema = new Schema<IEmpresa, EmpresaModel>({
    nombre_comercial:{
        type: String,
        required: [true, 'El nombre comercial de la empresa es obligatorio']
    },
    razon_social:{
        type: String,
        required: [true, 'La razon socialde la empresa es obligatorio']
    },
    ruc:{
        type: String,
        required: [true, 'El RUC de la empresa es obligatorio']
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

EmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Supplier', EmpresaSchema)