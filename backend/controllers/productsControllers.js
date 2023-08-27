const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')

const getProducts = asyncHandler(async (req,res) => {
    if(req.user.admin !== true){
        res.status(401)
        throw new Error('Unauthorized. No admin user was found.')
    }
    const product = await Product.find()
    res.status(200).json(product)
})

const getByIdProducts = asyncHandler(async (req,res) => {
    if(req.user.admin !== true){
        res.status(401)
        throw new Error('Unauthorized. No admin user was found.')
    }
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})

const setProducts = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.price || !req.body.amount){
        res.status(400)
        throw new Error('Please fulfill all the fields.')
    }else if(req.user.admin !== true){
        res.status(401)
        throw new Error('Unauthorized. No admin user was found.')
    }

    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount
    })
    res.status(201).json(product)
})

const updateProducts = asyncHandler (async (req, res) => {

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error ('Product not found.')
    }
    
    if(req.user.admin !== true) {
        res.status(401)
        throw new Error ('Unauthorized. No admin user was found.')
    }else {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateProduct)
    } 
})

const deleteProducts = asyncHandler (async (req, res) => {

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error ('Product not found.')
    }

    if(req.user.admin !== true) {
        res.status(401)
        throw new Error ('Unauthorized. No admin user was found.')
    }else {
        product.deleteOne()
        res.status(200).json({ id: product._id})
    }     
})

module.exports = {
    getProducts,
    setProducts,
    getByIdProducts,
    updateProducts,
    deleteProducts
}