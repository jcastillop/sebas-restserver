"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaBorrar = exports.categoriaActualizar = exports.categoriaObtener = exports.categoriaListar = exports.categoriaNuevo = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const categoriaNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {usuario, nombre, correo, password, rol, application} = req.body;
    // const usrSaved = new Usuario({usuario, nombre, correo, password, rol, application});
    // //encriptar la contrasena
    // await usrSaved.save();
    res.json({
        msg: 'post API - usuariosPosts'
    });
});
exports.categoriaNuevo = categoriaNuevo;
const categoriaListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const { empresa } = req.body;
    var parametros = {};
    parametros = { estado: true };
    if (empresa) {
        parametros = { estado: true, empresa: empresa };
    }
    const [total, categorias] = yield Promise.all([
        categoria_1.default.countDocuments(parametros),
        categoria_1.default.find(parametros)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    });
});
exports.categoriaListar = categoriaListar;
const categoriaObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findById(id);
    res.json(categoria);
});
exports.categoriaObtener = categoriaObtener;
const categoriaActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resto = __rest(req.body, []);
    const categoria = yield categoria_1.default.findByIdAndUpdate(id, resto);
    res.json(categoria);
});
exports.categoriaActualizar = categoriaActualizar;
const categoriaBorrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByIdAndUpdate(id, { estado: false });
    res.json(categoria);
});
exports.categoriaBorrar = categoriaBorrar;
//# sourceMappingURL=categorias.js.map