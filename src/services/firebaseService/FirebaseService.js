import admin from 'firebase-admin'
import { serviceAccount } from './serviceAccount.js'

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})


const connect = async() =>{
    try{
        const db=admin.firestore();
        return db
    }
    catch(error){
        console.log(`Could not connect to firebase, error: ${error}`)
    }
}

const db=await connect()

export {db}
