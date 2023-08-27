const express = require('express')
const router = express.Router()
const { getProducts, setProducts, getByIdProducts, updateProducts, deleteProducts } = require('../controllers/productsControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProducts).post( protect, setProducts )

router.route('/:id').get(protect, getByIdProducts).put(protect,updateProducts).delete(protect, deleteProducts)

module.exports = router