import {ContainerFS} from '../../containers/index.js'
import {config} from '../../config/index.js'

export class ProductsFS extends ContainerFS{
    constructor(){
        super(config.DATABASES.FILESYSTEM.PRODUCTS_FILENAME)
    }
}