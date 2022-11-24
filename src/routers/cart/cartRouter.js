import {Router} from 'express'
import { CartsDao,ProductDao} from '../../Dao/index.js'
import { ERRORS_UTILS,DATE_UTILS} from '../../utils/index.js';


const router = Router()

// A) POST: '/' - Crea un carrito y devuelve su id.

router.post('/', async (req,res)=>{
    const cart={timestamp:DATE_UTILS.getTimestamp(),products:[]}
    const newCart=await CartsDao.save(cart)
    res.send({success:true,cartId:newCart.id})
})

// B)  DELETE:'/:id' - Vacía un carrito y lo elimina.

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    await CartsDao.deleteById(Number(id))
    const allCarts=await CartsDao.getAll()
    res.send({"carts":allCarts})
})

// C) GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito

router.get('/:id/products', async (req,res)=>{
    try{
        const {id}=req.params;
        const cart = await CartsDao.getById(Number(id));
        const cartProducts=cart.products;
        res.send(cartProducts)
    }
    catch (error){
        res.send({message:error})
    }
})

// D) POST: '/:id/products' - Para incorporar productos al carrito por su id de producto

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
    res.send({ success: true, cart: updatedCart });
})

// E) DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

router.delete('/:id/products/:prod', async(req,res)=>{
    try{
    const {id,prod}=req.params;
    const cart = await CartsDao.getById(Number(id))
    if (!cart){
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
    }
    const productsArray=cart.products;
    console.log(productsArray)
    }
    catch(error){
        res.send({ message: error})
    }
})

export {router as cartRouter}
