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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'El token no existe en la peticion'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY || 'KEYNOTEXIST');
        console.log("El codigo desencriptado: ");
        console.log(decoded);
        const usuario = yield Usuario.findById(decoded).populate('application', 'nombre');
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            });
        }
        //req.usuario =  usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
    console.log(token);
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map