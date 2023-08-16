import { Model, Schema, model } from "mongoose";

interface IEmpresaCliente {
    empresa: Schema.Types.ObjectId;
    cliente: Schema.Types.ObjectId;
    descripcion: string;
    estado: boolean;
}

const SupplierCustomerSchema = new Schema<IEmpresaCliente>({
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Customer',
        required: true
    },
    cliente:{
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

SupplierCustomerSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'SupplierCustomer', SupplierCustomerSchema)