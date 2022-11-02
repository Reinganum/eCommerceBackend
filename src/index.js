import express from 'express'
import { productRouter, cartRouter} from './routers/index.js';
import { config } from './config/index.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(config.SERVER.PORT, ()=>{(console.log(`server running on port ${config.SERVER.PORT}`))})
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use(express.static('public'))
