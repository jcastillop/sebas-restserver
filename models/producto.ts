import { Schema, model } from "mongoose";
import { IProducto, ProductoModel, IProductoMethods } from "../interfaces";

const ProductoSchema = new Schema<IProducto, ProductoModel, IProductoMethods>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },    
    aplicacion:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    },     
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categorie',
        required: true
    },   
    codigo:{
        type: String
    },
    codigo_sunat:{
        type: String
    },      
    descuento:{
        type: Number,
        default: 0
    },    
    descripcion:{
        type: String,
        required: [true, 'La descripcion de la categoria es obligatoria']
    },
    estado:{
        type: Boolean, 
        default: true
    },    
    precio_unitario:{
        type: Number,
        default: 0
    },
    unidad_medida:{
        type: String,
        default: "NIU"
    },      
    valor_unitario:{
        type: Number,
        default: 0
    },
})

ProductoSchema.static('saveProducto', function saveProducto( producto: IProducto ) {
    return this.create(producto);
});
ProductoSchema.static('getProducto', function getProducto( id: Schema.Types.ObjectId ) {
    return this.findById(id);
});
ProductoSchema.static('getProductos', function getProductos( aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : estado, empresa: empresa, aplicacion: aplicacion }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            //.populate([{ path: 'empresa', strictPopulate: false, select: 'nombre_comercial razon_social' }])
            .populate([{ path: 'empresa', strictPopulate: false }])    
            .populate([{ path: 'aplicacion', strictPopulate: false }])    
            .populate([{ path: 'categoria', strictPopulate: false }])   
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
ProductoSchema.static('updateProducto', function updateProducto( producto: IProducto ) {
    return this.updateOne(
        { "_id": producto._id}, 
        { "$set": {
            "nombre":           producto.nombre,
            "empresa":          producto.empresa, 
            "aplicacion":       producto.aplicacion,
            "categoria":        producto.categoria,
            "codigo":           producto.codigo, 
            "codigo_sunat":     producto.codigo_sunat,
            "descuento":        producto.descuento, 
            "descripcion":      producto.descripcion,
            "precio_unitario":  producto.precio_unitario,
            "unidad_medida":    producto.unidad_medida, 
            "valor_unitario":   producto.valor_unitario
            } 
        }
    )
});
ProductoSchema.static('deleteProducto', function deleteProducto( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IProducto, ProductoModel>( 'Product', ProductoSchema)