import {config} from "../config/index.js";
import {MongoService } from "../services/index.js";
import {ProductsFS,ProductsMongo,ProductsFirebase} from './products/index.js'
import {CartsMongo, CartsFirebase} from './cart/index.js'



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
                ProductDao: new ProductsFirebase(),
                CartDao: new CartsFirebase()
            })
        }
    }
}

const Fire=new ProductsFirebase()
Fire.getAll()

const {ProductDao, CartsDao} = getSelectedDaos()

export {ProductDao, CartsDao};

