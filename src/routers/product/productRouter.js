import {Router} from 'express';
import { ProductDao, addLog} from '../../Dao/index.js';
import { verifyRole } from '../../middlewares/validateRole.js';
import { ERRORS_UTILS,JOI_VALIDATION,DATE_UTILS} from '../../utils/index.js';
const productRouter=Router()

productRouter.get('/', async (req,res)=>{
    const products = await ProductDao.getAll()
    if (!products) {
        let error = ERRORS_UTILS.MESSAGES.NO_PRODUCT
        return addLog(error)
    }
    res.send(products)
})

productRouter.get('/:id', async (req,res)=>{
    const {id}=req.params
    const product = await ProductDao.getById(Number(id))
    if (!product) {
        let error = ERRORS_UTILS.MESSAGES.NO_PRODUCT
        return addLog(error)
    }
    res.send(product)
})


productRouter.post('/',verifyRole, async (req,res)=>{
    try{
        const {title,description,code,thumbnail,price,stock} = req.body;
        const product= await JOI_VALIDATION.productTemplate.validateAsync({title,description,code,thumbnail,price,stock,timestamp:DATE_UTILS.getTimestamp()})
        const newProduct=await ProductDao.save(product)
        res.send(newProduct)
    }
    catch(error){
        res.send(error)
    } 
})

productRouter.delete('/:id',verifyRole, async (req,res)=>{
    try{
        const {id}=req.params;
        await ProductDao.deleteById(id)
        res.send({success:true})
    } 
    catch (error){
        res.send(error)
    }
})

productRouter.put('/:id',verifyRole,async(req,res)=>{
    try{
        const {id}=req.params;
        await ProductDao.updateById(Number(id),req.body)
        res.send({success:true})
    }
    catch (error){
        res.send(error)
    }
})

export {productRouter}