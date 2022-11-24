import knex from 'knex'

const sqlConfig = {
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:'',
        database:'products'
    }
}

const knexSql=knex(sqlConfig)

export{knexSql}