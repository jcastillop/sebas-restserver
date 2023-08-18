import { Schema, model } from "mongoose";
import { IServicio, ServicioModel, IServicioMethods } from "../interfaces";

const ServicioSchema = new Schema<IServicio, ServicioModel, IServicioMethods>({
    codigo:{
        type: String,
        required: [true, 'El codigo del servicio es obligatorio']
    },
    nombre:{
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },    
    descripcion:{
        type: String
    },
    aplicacion:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },     
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },  
    estado:{
        type: Boolean, 
        default: true
    }
})

ServicioSchema.static('saveServicio', function saveServicio( servicio: IServicio ) {
    return this.create(servicio);
});
ServicioSchema.static('getServicio', function getServicio( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
ServicioSchema.static('getServicios', function getServicios( skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
ServicioSchema.static('updateServicio', function updateServicio( servicio: IServicio ) {
    return this.updateOne(
        { "_id": servicio._id}, 
        { "$set": {
            "codigo":       servicio.codigo,
            "nombre":       servicio.nombre, 
            "descripcion":  servicio.descripcion, 
            "aplicacion":   servicio.aplicacion,
            "empresa":      servicio.empresa
            } 
        }
    )
});
ServicioSchema.static('deleteServicio', function deleteServicio( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

ServicioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IServicio, ServicioModel>( 'Service', ServicioSchema)