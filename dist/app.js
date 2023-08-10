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
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
const models_1 = require("./models");
//Configurar dotenv
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
const createAplication = function (usuarioId, aplicacion) {
    return models_1.Aplicacion.create(aplicacion).then(app => {
        console.log("\n>> Created aplicacion:\n", app);
        return models_1.Usuario.findByIdAndUpdate(usuarioId, { $push: { applications: app._id } }, { new: true, useFindAndModify: false });
    });
};
const createEmpresa = function (appId, empresa) {
    return models_1.Empresa.create(empresa).then(app => {
        console.log("\n>> Created empresa:\n", app);
        return models_1.Aplicacion.findByIdAndUpdate(appId, { $push: { suppliers: app._id } }, { new: true, useFindAndModify: false });
    });
};
const createRol = function (usuarioId, rol) {
    return models_1.Rol.create(rol).then(app => {
        console.log("\n>> Created rol:\n", app);
        return models_1.Usuario.findByIdAndUpdate(usuarioId, { $push: { rols: app._id } }, { new: true, useFindAndModify: false });
    });
};
const createCategoria = function (empresaId) {
    models_1.Categoria.create({ nombre: "cuidado de piel", descripcion: "mejorar la apariencia y el tacto de la piel", empresa: empresaId }).then(app => {
        console.log("\n>> Created rol:\n", app);
    });
    models_1.Categoria.create({ nombre: "otros", descripcion: "productos sin categoria especifica", empresa: empresaId }).then(app => {
        console.log("\n>> Created rol:\n", app);
    });
    return "";
};
const run = function () {
    return __awaiter(this, void 0, void 0, function* () {
        createCategoria("64acc6d680d17c210fd9f1b0");
    });
};
//run();
/*
const run = async function() {
    const tutorial1 = await createAplication("64ac9db748629fe4cfb16fdc", {
      nombre: "SEBAS",
      descripcion: "Software"
    });
    const empresa = await createEmpresa("64ac9db748629fe4cfb16fdc", {
      nombre_comercial: "SPAXION",
      razon_social: "Spaxion por tu belleza SAC",
      ruc: "20608699679",
    });
    const rol = await createRol("64ac9db748629fe4cfb16fdc", {
      nombre: "ADMIN",
      descripcion: "Administracion de usuarios"
    });
};
run();
*/ 
//# sourceMappingURL=app.js.map