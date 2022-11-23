
class ContainerFireBase{
    constructor(collection){
        this.collection=collection;
    }
    async getAll(){
        try{
            const document=await this.collection.get()
            return document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
        }
        catch(error){
            console.error(`Could not bring documents:${error}`);
        }
    }
    async save(obj){
        try{
            const document=this.collection.doc()
            await document.create(obj)
            console.log("object created!")
        }
        catch(error){
            console.error(`Could not save object:${error}`);
        }
    }
    async getById(id){
        try{
            const document=await this.collection.doc(id).get()
            return document.data()
        }
        catch(error){
            console.error(`Could not bring document:${error}`);
        }
    }
    async updateById(id,newData){
        try{
            const document=this.collection.doc(id)
            await document.update(newData)
            console.log("updated")
        }
        catch(error){
            console.error(`Could not update documents:${error}`);
        }
    }
    async remove(id){
        try{
            const document=this.collection.doc(id)
            await document.delete()
            console.log("eliminated!")
    
        }
        catch(e){
            console.error(`Could not eliminate the document:${error}`);
        }
    }
}

export {ContainerFireBase}

