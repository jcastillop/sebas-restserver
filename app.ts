import dotenv from 'dotenv';
import Server from './models/server';

import {Aplicacion, Usuario, Empresa, Rol, Categoria} from "./models";

//Configurar dotenv
dotenv.config();

const server = new Server();

server.listen();

// const createAplication = function(usuarioId: any, aplicacion: any) {
//   return Aplicacion.create(aplicacion).then(app => {
//     console.log("\n>> Created aplicacion:\n", app);
//     return Usuario.findByIdAndUpdate(
//       usuarioId,
//       { $push: { applications: app._id } },
//       { new: true, useFindAndModify: false }
//     );  
//   });
// };

// const createEmpresa = function(appId: any, empresa: any) {
// return Empresa.create(empresa).then(app => {
//   console.log("\n>> Created empresa:\n", app);
//   return Aplicacion.findByIdAndUpdate(
//     appId,
//     { $push: { suppliers: app._id } },
//     { new: true, useFindAndModify: false }
//   );  
// });
// };

// const createRol = function(usuarioId: any, rol: any) {
//   return Rol.create(rol).then(app => {
//     console.log("\n>> Created rol:\n", app);
//     return Usuario.findByIdAndUpdate(
//       usuarioId,
//       { $push: { rols: app._id } },
//       { new: true, useFindAndModify: false }
//     );  
//   });
// };

// const createCategoria = function(empresaId: any) {
//   Categoria.create({nombre: "cuidado de piel", descripcion: "mejorar la apariencia y el tacto de la piel", empresa: empresaId}).then(app => {
//     console.log("\n>> Created rol:\n", app);
//   });
//   Categoria.create({nombre: "otros", descripcion: "productos sin categoria especifica", empresa: empresaId}).then(app => {
//     console.log("\n>> Created rol:\n", app);
//   });  
//   return "";
// };
// const run = async function() {
//   createCategoria("64acc6d680d17c210fd9f1b0")
// }
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