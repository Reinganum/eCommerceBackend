import {Router} from 'express'
import {cartController} from '../../controllers/index.js'


const router = Router()

// A) POST: '/' - Crea un carrito y devuelve su id.

router.post('/',cartController.createCart)

// B)  DELETE:'/:id' - Vacía un carrito y lo elimina.

router.delete('/:id',cartController.removeCart)

// C) GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito

router.get('/carts/:id', cartController.getAllProducts)

// D) POST: '/:id/products' - Para incorporar productos al carrito por su id de producto

router.post('/:cartId/products', cartController.addProductById)

// E) DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

router.delete('/:id/products/:prod', cartController.removeProductById)

export {router as cartRouter}
