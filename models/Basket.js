const mongoose = require("mongoose")
const Products = require("./Products")
const User = require("./User")
const BasketSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Products
    }

})
module.exports = mongoose.model('BasketSchema', BasketSchema)//מייצאים

// {
//     "userName":"AAA",
//     "game":"aaa"
// }