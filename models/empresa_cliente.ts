import { Schema, model } from "mongoose";
import { IEmpresaCliente, EmpresaClienteModel, IEmpresaClienteMethods } from "../interfaces";

const EmpresaClienteSchema = new Schema<IEmpresaCliente, EmpresaClienteModel, IEmpresaClienteMethods>({
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
    estado:{
        type: Boolean, 
        default: true
    },        
})

EmpresaClienteSchema.index({ empresa: 1, cliente: 1 }, { unique: true })

EmpresaClienteSchema.static('saveEmpresaCliente', function saveEmpresaCliente( empresa_cliente: IEmpresaCliente ) {
    return this.create(empresa_cliente);
});
EmpresaClienteSchema.static('getEmpresaCliente', function getEmpresaCliente( empresa: Schema.Types.ObjectId, cliente: Schema.Types.ObjectId ) {
    return this.findOne({ empresa, cliente });
});
EmpresaClienteSchema.static('getEmpresasClientes', function getEmpresasClientes( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .populate([{ path: 'empresa', strictPopulate: false }])    
            .populate([{ path: 'cliente', strictPopulate: false }])    
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
EmpresaClienteSchema.static('updateEmpresasClientes', function updateEmpresasClientes( empresa_cliente: IEmpresaCliente ) {
    return this.updateOne(
        { "_id": empresa_cliente._id}, 
        { "$set": {
            "empresa":          empresa_cliente.empresa, 
            "cliente":          empresa_cliente.cliente
            } 
        }
    )
});
EmpresaClienteSchema.static('deleteEmpresasClientes', function deleteEmpresasClientes( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

EmpresaClienteSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IEmpresaCliente, EmpresaClienteModel>( 'SupplierCustomer', EmpresaClienteSchema)