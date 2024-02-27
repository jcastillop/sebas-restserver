import mongoose, { ClientSession, Schema, model } from "mongoose";
import { ICliente, ClienteModel, IClienteMethods } from "../interfaces";
import { Collection, Document } from "mongodb";

const ClienteSchema = new Schema<ICliente, ClienteModel, IClienteMethods>({
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

ClienteSchema.static('saveCliente', async function saveCliente( cliente: ICliente, id_empresa: string ) {
    return this.create(cliente);
});
ClienteSchema.static('getCliente', function getCliente( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
ClienteSchema.static('getClienteByDocument', function getCliente( valor:string ) {
    return this.findOne({ numero_documento: valor });
});
ClienteSchema.static('getClientes', function getClientes( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
ClienteSchema.static('updateCliente', function updateCliente( cliente: ICliente ) {
    return this.updateOne(
        { "_id": cliente._id}, 
        { "$set": {
            "tipo_documento":   cliente.tipo_documento,
            "numero_documento": cliente.numero_documento, 
            "nombre_comercial": cliente.nombre_comercial,
            "razon_social":     cliente.razon_social,
            "ubigeo":           cliente.ubigeo, 
            "direccion":        cliente.direccion
            } 
        }
    )
});
ClienteSchema.static('deleteCliente', function deleteCliente( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

ClienteSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<ICliente, ClienteModel>( 'Customer', ClienteSchema)