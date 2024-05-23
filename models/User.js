const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        lowercase: true,//אותיות קטנות
        required: true,//שדה חובה
        unique: true,//ייחודי
        trim: true//מוריד רווחים משני הצדדים
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String
    },
    roles: {//הרשאות
        type: String,
        enum: ['User', 'Admin'],//Admin אוUser מערך שיכול להיות או
        default: "User"

    },
    active: {//פעיל
        type: Boolean,
        default: true
    }
},
    { timestamps: true }

)
module.exports = mongoose.model("User", UserSchema)
// {
//     "userName":"325739415",
//     "id":"7926",
//     "name":"shulamit"
// }