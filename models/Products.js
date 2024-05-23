const { Int32 } = require("mongodb")
const mongoose = require("mongoose")
const ProductsSchema = new mongoose.Schema({
    name: {//שם
        type: String,
        // required: true,

    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },

    price: {
        type: Number,
    },
    picture: {
        // type: mongoose.Schema.Types.String,
        type: String
    },
    only: {//שם
        type: Boolean,      
        default:false

    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Products', ProductsSchema)//מייצאים

// {
//     "name":"צעצוע",
//     "password":"456",
//     "price":"cgfnh"
// }