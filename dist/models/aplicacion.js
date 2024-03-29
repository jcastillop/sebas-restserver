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
const AplicacionSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la aplicacion es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la aplicacion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
AplicacionSchema.static('saveAplicacion', function saveAplicacion(aplicacion) {
    return this.create(aplicacion);
});
AplicacionSchema.static('getAplicacion', function getAplicacion(id) {
    return this.findById(id);
});
AplicacionSchema.static('getAplicaciones', function getAplicaciones(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
AplicacionSchema.static('updateAplicacion', function updateAplicacion(aplicacion) {
    return this.updateOne({ "_id": aplicacion._id }, { "$set": {
            "nombre": aplicacion.nombre,
            "descripcion": aplicacion.descripcion
        }
    });
});
AplicacionSchema.static('deleteAplicacion', function deleteAplicacion(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
AplicacionSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Application', AplicacionSchema);
//# sourceMappingURL=aplicacion.js.map