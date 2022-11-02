import {Router} from 'express'
import { CartsDao,ProductDao,addLog} from '../../Dao/index.js'
import { ERRORS_UTILS,JOI_VALIDATION,DATE_UTILS} from '../../utils/index.js';

const router = Router()

router.post('/', async (req,res)=>{
    const cart={timestamp:DATE_UTILS.getTimestamp(),products:[]}
    const newCart=await CartsDao.save(cart)
    res.send({success:true,cartId:newCart.id})
})

router.post('/:cartId/products', async(req,res)=>{
    const { productId } = req.body;
    const { cartId } = req.params;
    const product = await ProductDao.getById(Number(productId))
    if (!product){
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
    }
    const cart = await CartsDao.getById(Number(cartId))
    if (!cart){
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
    }
    cart.products.push(product);
    const updatedCart = await CartsDao.updateById(Number(cartId),cart)
    console.log(updatedCart)
    res.send({ success: true, cart: updatedCart });
})

router.delete('/:id',verifyRole, async (req,res)=>{
    try{
        const {id}=req.params;
        await CartsDao.deleteById(id)
        res.send({success:true})
    } 
    catch (error){
        res.send(error)
    }
})

export {router as cartRouter}
