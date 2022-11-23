import dotenv from "dotenv"
dotenv.config();

const PRODUCTS_FILENAME='products'
const ERRORS_FILENAME='errors'
const CARTS_FILENAME='carts'

const config={
    SERVER:{
        PORT:process.env.PORT||3000,
        SELECTED_DATABASE:process.env.SELECTED_DB
    },
    DATABASES:{
        FILESYSTEM:{
            PRODUCTS_FILENAME,
            CARTS_FILENAME,
            ERRORS_FILENAME,
        },
        mongo: {
            url:process.env.MONGO_DB_URL,
            dbName:process.env.MONGO_DB_NAME,
        },
    }
}

export {config}