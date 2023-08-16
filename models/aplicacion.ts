import { HydratedDocument, Model, Schema, model } from "mongoose";

interface IAplicacion {
    nombre: string;
    descripcion: string;
    estado: boolean;
}
interface IAplicacionMethods {
    fullDescripcion(): string;
}
interface AplicacionModel extends Model<IAplicacion, {}, IAplicacionMethods> {
    createAplicacion(nombre: string, descripcion: string): Promise<HydratedDocument<IAplicacion, IAplicacionMethods>>;
}

const AplicacionSchema = new Schema<IAplicacion, AplicacionModel, IAplicacionMethods>({
    nombre:{
        type: String,
        required: [true, 'El nombre de la aplicacion es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion de la aplicacion es obligatoria']
    },
    estado:{
        type: Boolean, 
        default: true
    },        
})

AplicacionSchema.static('createAplicacion', function createAplicacion(nombre: string, descripcion: string) {
    return this.create({ nombre, descripcion });
});

AplicacionSchema.method('fullDescripcion', function fullDescripcion(): string {
    return this.nombre + '|' + this.descripcion;
  });

AplicacionSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model( 'Application', AplicacionSchema)