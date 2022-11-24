import {config} from "../config/index.js";
import {MongoService} from "../services/index.js";
import {ProductsFS,ProductsMongo,ProductsSql,ProductsFirebase} from './products/index.js'
import {CartsMongo,CartSql,CartsFirebase} from './cart/index.js'


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

const SELECTED_DATABASE="firebase"

const getSelectedDaos=()=>{
    switch(SELECTED_DATABASE){    
        case "mongo": {
            MongoService.init()
            console.log('connected to mongo atlas Database')
            return ({
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo()
            })
        }
        case "fs":{
            console.log('connected to Filesystem as memory');
            return({
                ProductDao: new ProductsFS()
             })
        }
        case "firebase":{
            console.log('connected to Firebase');
            return({
                ProductDao: new ProductsFirebase(),
                CartDao: new CartsFirebase()
            })
        }
        case "sql":{
            console.log('connected to Sql');
            return({
                ProductDao: new ProductsSql(),
            })
        }
    }
}

const {ProductDao, CartsDao} = getSelectedDaos()

export {ProductDao, CartsDao};

