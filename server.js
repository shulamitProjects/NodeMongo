require("dotenv").config()//מקשר למסיר נתונים .ENV- שימוש במשתנים שאנו מעוניינים לאבטח לא להציג בקוד 
const express = require("express")//חבילה שמתקינה שרת
const cors = require("cors")//מאפשר גישה לשרת

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")

const { default: mongoose } = require("mongoose")//חיבור למסד הנתונים

const PORT = process.env.PORT || 7001
const app = express()//הקמת השרת
connectDB()

//middlewares -בין המשתמש למתכנת
app.use(cors(corsOptions))//גישה לרשימה הלבנה
app.use(express.json())//json הוספת אפשרות להשתמש עם
app.use(express.static("public"))//public בתקיה static מאפשר להשתמש בקבצים 
app.use("/api/games", require("./routes/game"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/basket", require("./routes/basket"))

//routes
app.get("/", (req, res) => {
    res.send("this is the home page")
})
console.log(process.env.NODE_ENV)

mongoose.connection.once('open', () => {//בודק אם קיים חיבור פתוח למסד נתונים
    console.log('Connected to MongoDB')

    //run
    app.listen(PORT, () => {//אם קיים חיבור-הרצת השרת
        console.log(`Server runing on port ${PORT}`)
    })
})
console.log("aaa");

mongoose.connection.on("error", err => {
    console.log(err);
})
console.log(PORT)
// DATABASE_URI =mongodb://srv1:27017/2023_214388480_node3
//052-761-8102