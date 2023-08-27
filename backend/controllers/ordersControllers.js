const asyncHandler = require('express-async-handler')
const Order = require('../models/ordersModel')

const setOrders = asyncHandler(async(req,res) =>{
    if(!req.body.products && !req.body.amount) {
        res.status(400)
        throw new Error('Please fulfill all of the fields.')
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
    if(!order){
        res.status(404)
        throw new Error ('The order was not found.')
    }
    
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
    if(!order){
        res.status(404)
        throw new Error ('This order was not found.')
    }

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