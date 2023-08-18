import { HydratedDocument, Model, Schema, model } from "mongoose";
import { AplicacionModel, IAplicacion, IAplicacionMethods } from "../interfaces";

const AplicacionSchema = new Schema<IAplicacion, AplicacionModel, IAplicacionMethods>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la aplicacion es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion de la aplicacion es obligatoria']
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

AplicacionSchema.static('saveAplicacion', function saveAplicacion( aplicacion: IAplicacion ) {
    return this.create(aplicacion);
});
AplicacionSchema.static('getAplicacion', function getAplicacion( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
AplicacionSchema.static('getAplicaciones', function getAplicaciones( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
AplicacionSchema.static('updateAplicacion', function updateAplicacion( aplicacion: IAplicacion ) {
    return this.updateOne(
        { "_id": aplicacion._id}, 
        { "$set": {
            "nombre":           aplicacion.nombre,
            "descripcion":      aplicacion.descripcion
            } 
        }
    )
});
AplicacionSchema.static('deleteAplicacion', function deleteAplicacion( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

AplicacionSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IAplicacion, AplicacionModel>( 'Application', AplicacionSchema)