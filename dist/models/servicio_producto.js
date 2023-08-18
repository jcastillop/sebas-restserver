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
const ServicioProductoSchema = new mongoose_1.Schema({
    servicio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    producto: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    precio: {
        type: Number
    },
    cantidad: {
        type: Number
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});
ServicioProductoSchema.index({ aplicacion: 1, empresa: 1 }, { unique: true });
ServicioProductoSchema.static('saveServicioProducto', function saveServicioProducto(servicio_producto) {
    return this.create(servicio_producto);
});
ServicioProductoSchema.static('getServicioProducto', function getServicioProducto(id) {
    return this.findById(id);
});
ServicioProductoSchema.static('getServiciosProductos', function getServiciosProductos(servicio, skip, limit, estado) {
    const parametros = { servicio: servicio, estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .populate([{ path: 'servicio', strictPopulate: false }])
            .populate([{ path: 'producto', strictPopulate: false }])
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
ServicioProductoSchema.static('updateServicioProducto', function updateServicioProducto(servicio_producto) {
    return this.updateOne({ "_id": servicio_producto._id }, { "$set": {
            "precio": servicio_producto.precio,
            "cantidad": servicio_producto.cantidad,
            "descripcion": servicio_producto.descripcion
        }
    });
});
ServicioProductoSchema.static('deleteServicioProducto', function deleteServicioProducto(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
ServicioProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('ServiceProduct', ServicioProductoSchema);
//# sourceMappingURL=servicio_producto.js.map