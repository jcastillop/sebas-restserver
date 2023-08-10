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
    categoria: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        }],
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
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
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
ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Producto', ProductoSchema);
//# sourceMappingURL=producto.js.map