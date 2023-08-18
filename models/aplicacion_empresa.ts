import { Schema, model } from "mongoose";
import { IAplicacionEmpresa, AplicacionEmpresaModel, IAplicacionEmpresaMethods } from "../interfaces";

const AplicacionEmpresaSchema = new Schema<IAplicacionEmpresa, AplicacionEmpresaModel,IAplicacionEmpresaMethods>({
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

AplicacionEmpresaSchema.index({ aplicacion: 1, empresa: 1 }, { unique: true })

AplicacionEmpresaSchema.static('saveAplicacionEmpresa', function saveAplicacionEmpresa( aplicacion_empresa: IAplicacionEmpresa ) {
    return this.create(aplicacion_empresa);
});
AplicacionEmpresaSchema.static('getAplicacionEmpresa', function getAplicacionEmpresa( aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId ) {
    return this.findOne({ aplicacion, empresa });
});
AplicacionEmpresaSchema.static('getAplicacionesEmpresas', function getAplicacionesEmpresas( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            //.populate([{ path: 'empresa', strictPopulate: false, select: 'nombre_comercial razon_social' }])
            .populate([{ path: 'empresa', strictPopulate: false }])    
            .populate([{ path: 'aplicacion', strictPopulate: false }])    
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
AplicacionEmpresaSchema.static('updateAplicacionEmpresa', function updateAplicacionEmpresa( aplicacion_empresa: IAplicacionEmpresa ) {
    return this.updateOne(
        { "_id": aplicacion_empresa._id}, 
        { "$set": {
            "empresa":          aplicacion_empresa.empresa, 
            "aplicacion":       aplicacion_empresa.aplicacion,
            "descripcion":      aplicacion_empresa.descripcion
            } 
        }
    )
});
AplicacionEmpresaSchema.static('deleteAplicacionEmpresa', function deleteAplicacionEmpresa( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

AplicacionEmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IAplicacionEmpresa, AplicacionEmpresaModel>( 'ApplicationSupplier', AplicacionEmpresaSchema)