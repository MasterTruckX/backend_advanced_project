const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    order: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Order'
    },
    total: {
        type: mongoose.Types.Decimal128,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)
