import mongoose from "mongoose"
import { Log4js } from "../helpers";

const dbConnnection = async() => {
    try {
        await mongoose.set('debug', function (collectionName, method, query, doc) { 
            Log4js(`${collectionName}.${method} - ${JSON.stringify(query)} - ${JSON.stringify(doc)}`);
        });
        await mongoose.connect(process.env.MONGO_CNN || "")
        console.log('base de datos on line')

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la BD')
    }
}

export default dbConnnection;