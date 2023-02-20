const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log('Base de Datos Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicial la base de datos');
    }
}   

module.exports ={
    dbConnection
}