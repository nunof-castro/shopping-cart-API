import {Router} from "express"
import {addItem, removeItem, getCartById} from "../controllers/cart-item"

const router = Router()

router.route("/:cartId/products").post(addItem)
router.route("/:cartId/products/:productId").delete(removeItem)
router.route("/:cartId").get(getCartById)


export default router