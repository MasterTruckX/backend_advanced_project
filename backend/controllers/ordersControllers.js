const asyncHandler = require('express-async-handler')
const Order = require('../models/ordersModel')
const Product = require('../models/productsModel')

function validateOrder(order){
    if(!order){
        res.status(404)
        throw new Error ('The order was not found.')
    }    
}

const setOrders = asyncHandler(async(req,res) =>{
    
    if(!req.body.products && !req.body.amount) {
        res.status(400)
        throw new Error('Please fulfill all of the fields.')
    }
    const product = await Product.findById(req.body.products)
    if(!product){
        res.status(404)
        throw new Error ('Product not found.')
    }else if(req.body.amount === 0 ) {
        res.status(400)
        throw new Error('Please select an amount above zero.')
    }else if(req.body.amount > product.amount){
        res.status(400)
        throw new Error('Please select an amount below the stock amount.')
    }else {
        const dif = product.amount - req.body.amount
        const update = await Product.updateOne({_id: product.id},{ amount: dif }) 
    }

    const order = await Order.create({
        user: req.user.id,
        products: req.body.products,
        amount: req.body.amount
    })
    res.status(201).json(order)
})

const getOrders = asyncHandler(async(req,res) => {
    const order = await Order.find({user: req.user.id })
    res.status(200).json(order)
})

const updateOrders = asyncHandler (async (req, res) => {

    const order = await Order.findById(req.params.id)
    validateOrder(order)
    
    if(order.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('This order does not belong to this user.')
    }else {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateOrder)
    } 
})

const deleteOrders = asyncHandler (async (req, res) => {

    const order = await Order.findById(req.params.id)
    validateOrder(order)

    if(order.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('This order does not belong to this user.')
    }else {
        order.deleteOne()
        res.status(200).json({ id: order._id})
    }

})


module.exports = {
    setOrders,
    getOrders,
    updateOrders,
    deleteOrders
}