import { Schema, model } from "mongoose";
import { IEmpresa, EmpresaModel, IEmpresaMethods } from "../interfaces";

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
        required: [true, 'El RUC de la empresa es obligatorio'],
        unique:true
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

EmpresaSchema.static('saveEmpresa', function saveEmpresa( empresa: IEmpresa ) {
    return this.create(empresa);
});
EmpresaSchema.static('getEmpresa', function getEmpresa( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
EmpresaSchema.static('getEmpresas', function getEmpresas( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
EmpresaSchema.static('updateEmpresa', function updateEmpresa( empresa: IEmpresa ) {
    return this.updateOne(
        { "_id": empresa._id}, 
        { "$set": {
            "nombre_comercial": empresa.nombre_comercial,
            "razon_social":     empresa.razon_social, 
            "ruc":              empresa.ruc,
            "ubigeo":           empresa.ubigeo,
            "direccion":        empresa.direccion
            } 
        }
    )
});
EmpresaSchema.static('deleteEmpresa', function deleteEmpresa( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});
EmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IEmpresa, EmpresaModel>( 'Supplier', EmpresaSchema)