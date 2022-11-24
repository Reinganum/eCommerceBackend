
import { ProductDao} from '../../Dao/index.js';
import { ERRORS_UTILS,JOI_VALIDATION,DATE_UTILS} from '../../utils/index.js';


const getAll=async(req,res)=>{
    const products = await ProductDao.getAll()
    if (!products) {
        let error = ERRORS_UTILS.MESSAGES.NO_PRODUCT
    }
    res.send(products)
}

const getById=async(req,res)=>{
    const {id}=req.params
    const product = await ProductDao.getById(id)
    if (!product) {
        let error = ERRORS_UTILS.MESSAGES.NO_PRODUCT
    }
    res.send(product)
}

const create = async(req,res)=>{
    try{
        const {title,description,code,thumbnail,price,stock} = req.body;
        const product= await JOI_VALIDATION.productTemplate.validateAsync({title,description,code,thumbnail,price,stock,timestamp:DATE_UTILS.getTimestamp()})
        const newProduct=await ProductDao.save(product)
        res.send(newProduct)
    }
    catch(error){
        res.send(error)
    } 
}

const remove = async (req,res)=>{
    try{
        const {id}=req.params;
        await ProductDao.deleteById(id)
        res.send({success:true})
    } 
    catch (error){
        res.send(error)
    }
}

const update=async(req,res)=>{
    try{
        const {id}=req.params;
        await ProductDao.updateById((id),req.body)
        res.send({success:true})
    }
    catch (error){
        res.send(error)
    }
}

export const productController = {getAll,getById,create,remove,update}