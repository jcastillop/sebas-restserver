const mongoose = require('mongoose')
const dbConnnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('base de datos on line')

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la BD')
    }
}
module.exports={
    dbConnnection
}