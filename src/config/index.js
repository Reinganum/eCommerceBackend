import dotenv from "dotenv"
dotenv.config();

const PRODUCTS_FILENAME='products'
const ERRORS_FILENAME='errors'
const CARTS_FILENAME='carts'

const config={
    SERVER:{
        PORT:8080 ||  process.env.port 
    },
    DATABASES:{
        FILESYSTEM:{
            PRODUCTS_FILENAME,
            CARTS_FILENAME,
            ERRORS_FILENAME,
        }
    }
}

export {config}