import { Schema, model } from "mongoose";
import { IRol, RolModel, IRolMethods } from "../interfaces";

const RolSchema = new Schema<IRol, RolModel, IRolMethods>({
    nombre:{
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion del rol es obligatoria']
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

RolSchema.static('saveRol', function saveRol( rol: IRol ) {
    return this.create(rol);
});
RolSchema.static('getRol', function getRol( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
RolSchema.static('getRoles', function getRoles( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
RolSchema.static('updateRol', function updateRol( rol: IRol ) {
    return this.updateOne(
        { "_id": rol._id}, 
        { "$set": {
            "nombre":       rol.nombre,
            "descripcion":  rol.descripcion
            } 
        }
    )
});
RolSchema.static('deleteRol', function deleteRol( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

RolSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

RolSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IRol, RolModel>( 'Rol', RolSchema)