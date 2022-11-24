import {db} from '../services/index.js'

class ContainerFireBase{
    constructor(table){
        this.connection=db.collection(table)
    }
    async getAll(){
        try
            {
            const document=await this.connection.get()
            const data=document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
            console.log(data)
            }
        catch(error){
            console.error(`Could not bring documents:${error}`);
        }
    }
    async save(obj){
        try
            {
            const document=this.connection.doc()
            document.create(obj)
            console.log("object created!")
            }
        catch(error)
            {
                console.error(`Could not save object:${error}`);
            }
    }
    async getById(id){
        try
        {
            const document=await this.connection.doc(id).get()
            console.log(document.data()) 
        }
        catch(error){
            console.error(`Could not bring document:${error}`);
        }
    }
    async updateById(id,newData){
        try
            {
            this.connection.doc(id).update(newData)
            console.log(`document with id: ${id} updated`)
            }
        catch(error){
            console.error(`Could not update documents:${error}`);
            }
    }
    async deleteById(id){
        try{
            this.connection.doc(id).delete()
            console.log(`document with id: ${id}, deleted successfully`)
        }
        catch(error){
            console.error(`Could not bring document:${error}`);
        }
    }
}

export {ContainerFireBase}

