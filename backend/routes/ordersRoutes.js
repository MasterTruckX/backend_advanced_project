const express = require('express')
const router = express.Router()
const { setOrders, getOrders, updateOrders, deleteOrders } = require('../controllers/ordersControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setOrders).get(protect, getOrders)
router.route('/:id').put(protect, updateOrders ).delete(protect, deleteOrders)

module.exports = router