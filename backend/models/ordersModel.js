const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    amount: {
        type: Number,
        require: [true, 'Please type up the amount of products']
    },
    subtotal: {
        type: mongoose.Types.Decimal128,
        require: true
    },
    delivered: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
