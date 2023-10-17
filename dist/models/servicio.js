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
const ServicioSchema = new mongoose_1.Schema({
    codigo: {
        type: String,
        required: [true, 'El codigo del servicio es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },
    descripcion: {
        type: String
    },
    aplicacion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});
ServicioSchema.static('saveServicio', function saveServicio(servicio) {
    return this.create(servicio);
});
ServicioSchema.static('getServicio', function getServicio(id) {
    return this.findById(id);
});
ServicioSchema.static('getServicios', function getServicios(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
ServicioSchema.static('updateServicio', function updateServicio(servicio) {
    return this.updateOne({ "_id": servicio._id }, { "$set": {
            "codigo": servicio.codigo,
            "nombre": servicio.nombre,
            "descripcion": servicio.descripcion,
            "aplicacion": servicio.aplicacion,
            "empresa": servicio.empresa
        }
    });
});
ServicioSchema.static('deleteServicio', function deleteServicio(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
ServicioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Service', ServicioSchema);
//# sourceMappingURL=servicio.js.map