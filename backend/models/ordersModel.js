const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        require: [true, 'Please type up the amount of products']
    },
    delivered: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
