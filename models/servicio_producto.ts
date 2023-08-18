import { Schema, model } from "mongoose";
import { IServicioProducto, IServicioProductoMethods, ServicioProductoModel } from "../interfaces";

const ServicioProductoSchema = new Schema<IServicioProducto, ServicioProductoModel,IServicioProductoMethods>({
    servicio:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    },  
    producto:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },   
    precio:{
        type: Number
    },
    cantidad:{
        type: Number
    },            
    descripcion:{
        type: String
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

ServicioProductoSchema.index({ aplicacion: 1, empresa: 1 }, { unique: true })

ServicioProductoSchema.static('saveServicioProducto', function saveServicioProducto( servicio_producto: IServicioProducto ) {
    return this.create(servicio_producto);
});
ServicioProductoSchema.static('getServicioProducto', function getServicioProducto( id: Schema.Types.ObjectId ) {
    return this.findById( id );
});
ServicioProductoSchema.static('getServiciosProductos', function getServiciosProductos( servicio: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean ) {

    const parametros = { servicio: servicio, estado : estado }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .populate([{ path: 'servicio', strictPopulate: false }])    
            .populate([{ path: 'producto', strictPopulate: false }])    
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
ServicioProductoSchema.static('updateServicioProducto', function updateServicioProducto( servicio_producto: IServicioProducto ) {
    return this.updateOne(
        { "_id": servicio_producto._id}, 
        { "$set": {
            "precio":       servicio_producto.precio, 
            "cantidad":     servicio_producto.cantidad,
            "descripcion":  servicio_producto.descripcion
            } 
        }
    )
});
ServicioProductoSchema.static('deleteServicioProducto', function deleteServicioProducto( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

ServicioProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IServicioProducto, ServicioProductoModel>( 'ServiceProduct', ServicioProductoSchema)