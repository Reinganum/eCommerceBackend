import { ContainerFS } from "../containers/containerFs.js";
import { DATE_UTILS } from "../utils/index.js";
import { config } from "../config/index.js";

// PRODUCTOS

const ProductDao=new ContainerFS(config.DATABASES.FILESYSTEM.PRODUCTS_FILENAME)

// CARTS

const CartsDao=new ContainerFS(config.DATABASES.FILESYSTEM.CARTS_FILENAME)

// LOG DE ERRORES EN EL SERVIDOR

const ErrorLogger=new ContainerFS(config.DATABASES.FILESYSTEM.ERRORS_FILENAME)
const addLog= async (error)=>{
    const newLog=({timestamp: DATE_UTILS.getTimestamp(), message:error})
    ErrorLogger.save(newLog)
}


export {ProductDao, CartsDao, addLog}