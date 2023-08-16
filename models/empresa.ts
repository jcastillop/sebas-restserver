import { HydratedDocument, Model, Schema, model } from "mongoose";
interface IEmpresa extends Document {
    nombre_comercial: string;
    razon_social: string;
    ruc: string;
    ubigeo: string;
    direccion: string;
    estado: boolean;
}
interface IEmpresaMethods {
    fullDescripcion(): string;
}
interface EmpresaModel extends Model<IEmpresa, {}, IEmpresaMethods> {
    createAplicacion(nombre: string, descripcion: string): Promise<HydratedDocument<IEmpresa, IEmpresaMethods>>;
}

const EmpresaSchema = new Schema<IEmpresa, EmpresaModel, IEmpresaMethods>({
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