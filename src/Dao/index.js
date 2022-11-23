import {config} from "../config/index.js";
import {MongoService } from "../services/index.js";
import {ProductsFS} from './products/index.js'
import {CartsMongo} from './cart/index.js'
import {ProductsMongo} from './products/index.js'
import { connect } from "../services/index.js";
import { ProductsFirebase } from "./products/index.js";




/* PRODUCTOS

const ProductDao=new ContainerFS(config.DATABASES.FILESYSTEM.PRODUCTS_FILENAME)

// CARTS

const CartsDao=new ContainerFS(config.DATABASES.FILESYSTEM.CARTS_FILENAME)

// LOG DE ERRORES EN EL SERVIDOR

const ErrorLogger=new ContainerFS(config.DATABASES.FILESYSTEM.ERRORS_FILENAME)
const addLog= async (error)=>{
    const newLog=({timestamp: DATE_UTILS.getTimestamp(), message:error})
    ErrorLogger.save(newLog)
}
*/

const SELECTED_DATABASE="mongo"

const getSelectedDaos=()=>{
    switch(SELECTED_DATABASE){    
        case "mongo": {
            MongoService.init();
            return ({
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo()
            })
        }
        case "fs":{
            return({
                ProductDao: new ProductsFS()
             })
        }
        case "firebase":{
            return({
                ProductDao: "esperando..."
            })
        }
    }
}

const {ProductDao, CartsDao} = getSelectedDaos()

const addLog='a'

export {ProductDao, CartsDao, addLog};

