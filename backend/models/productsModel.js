const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please type up the products name']
    },
    description: {
        type: String,
        required: [true, 'Please type up the products description']
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please type up the products description']
    },
    amount: {
        type: Number,
        required: [true, 'Please type up the products amount']
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)