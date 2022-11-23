import mongoose from "mongoose";
import {config} from '../../config/index.js'
const init = async()=>{
    try{
        mongoose.connect(config.DATABASES.mongo.url, {
            dbName: config.DATABASES.mongo.dbName
        })
        console.log("conectado al servidor de MongoDB")
    }
    catch (error){
        console.log(error)
    }
}

export const MongoService={
    init,
}