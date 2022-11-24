import {knexSql} from '../services/index.js'

class ContainerSql{
    constructor(table) {
        this.table=knexSql.schema.createTable(table, function(table) {
            table.increments("id")
            table.string(param2)
            table.string(param3)
            table.string(param4)
          })
    }
    async getAll(){
        return this.connection(this.table).select("*")
    }
    async save(obj){
        return this.connection(this.table).insert(obj)
    }
    async getById(id){
       return this.connection(this.table).where("id",id).select()
    }
    async deleteById(id){
        return this.connection(this.table).where("id",id).del();
    }
    async updateById(id,obj){
        return this.connection(this.table).where("id",id).update(obj);
    }
}

export {ContainerSql}
