const mongoose =require('mongoose')


function RunServer(){ 
    try {
        mongoose.connect('mongodb://localhost:27017/Registrationform')
        console.log('mongoDB connected')
    } catch (error) {
        console.log('not connected',error)
    }
}

module.exports = RunServer;
