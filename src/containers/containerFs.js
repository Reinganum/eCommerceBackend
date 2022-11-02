import fs from "fs"
import path from "path"

class ContainerFS{
    constructor(file) {
        try {
          this.file = path.join(process.cwd(), `./src/db/${file}.json`)
          fs.writeFileSync(this.file, '[]')
          } catch (error) {
            console.log(`Error en el constructor: ${error.message}`)
          }
      }
    async getAll() {
        try{
            const arr=await fs.promises.readFile(this.file,"utf-8")
            const arrObj=JSON.parse(arr)
            return arrObj;
        }
        catch (error) {
            throw new Error(`error en la lectura: ${error}`)
        }
    }
    async save(obj){
        try{
            let arrProductos= await this.getAll()
            let nuevoId=arrProductos.length+1
            obj.id=nuevoId;
            arrProductos.push(obj)
            let nuevoArr=arrProductos
            await fs.promises.writeFile(this.file,JSON.stringify(nuevoArr))
            return obj
        }
        catch{
            throw new Error (`error, no se pudo agregar objeto:`)
        }
    }
    async getById(id){
        let arrProductos= await this.getAll()
        return arrProductos.find(item=>(item.id)===(id))
    }
    async updateById(id, newData){
        try {
            const items = await this.getAll();
      
            const foundItemIndex = items.findIndex(
              (item) => item.id == id
            );
            if (foundItemIndex === -1) return null;
            const foundItem = items[foundItemIndex];
            items[foundItemIndex] = {...foundItem,...newData}
            console.log(items[foundItemIndex])
            await fs.promises.writeFile(this.file,JSON.stringify(items, null, 3));
              return foundItem;
        }
        
        catch (error)
        {
            console.log(error)
        }
    }
    async deleteById(id){
        try {
            const items = await this.getAll();
            const foundItem = items.find((item) => item.id == id);
            if (!foundItem) return "Element not found";
            const filterItems = items.filter((item) => item.id != id);
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(filterItems, null, 3)
            );
          } catch (error) {
            console.log(error);
          }
    }
}

export {ContainerFS}