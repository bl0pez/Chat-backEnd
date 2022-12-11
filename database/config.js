const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_CNN_STRING);
        console.log('Base de datos online');

    } catch (error) {
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}