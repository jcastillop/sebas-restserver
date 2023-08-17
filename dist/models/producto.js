"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    aplicacion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    codigo: {
        type: String
    },
    codigo_sunat: {
        type: String
    },
    descuento: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la categoria es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    precio_unitario: {
        type: Number,
        default: 0
    },
    unidad_medida: {
        type: String,
        default: "NIU"
    },
    valor_unitario: {
        type: Number,
        default: 0
    },
});
ProductoSchema.static('saveProducto', function saveProducto(producto) {
    return this.create(producto);
});
ProductoSchema.static('getProducto', function getProducto(id) {
    return this.findById(id);
});
ProductoSchema.static('getProductos', function getProductos(aplicacion, empresa, skip, limit, estado) {
    const parametros = { estado: true, empresa: empresa, aplicacion: aplicacion };
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
ProductoSchema.static('updateProducto', function updateProducto(producto) {
    return this.updateOne({ "_id": producto._id }, { "$set": {
            "nombre": producto.nombre,
            "empresa": producto.empresa,
            "aplicacion": producto.aplicacion,
            "categoria": producto.categoria,
            "codigo": producto.codigo,
            "codigo_sunat": producto.codigo_sunat,
            "descuento": producto.descuento,
            "descripcion": producto.descripcion,
            "precio_unitario": producto.precio_unitario,
            "unidad_medida": producto.unidad_medida,
            "valor_unitario": producto.valor_unitario
        }
    });
});
ProductoSchema.static('deleteProducto', function deleteProducto(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Producto', ProductoSchema);
//# sourceMappingURL=producto.js.map