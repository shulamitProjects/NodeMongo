const jwt = require('jsonwebtoken')//חבילה כדי לחולל טוקן
const bcrypt = require('bcrypt')//שימוש בחבילת פונקצית ההרשמה
const User = require("../models/User")

const login = async (req, res) => {//פונקצית כניסה למשתמש קיים
    const { userName, password } = req.body//נקבל את הנתונים של השם והסיסמא
    if (!userName || !password) {//אם לא קיים שם משתמש או סיסמא
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ userName }).lean()//userNameבדיקה אם קיים המשתמש לפי ה
    console.log(foundUser,"foundUser");
    if (!foundUser || !foundUser.active) {//אם המשתמש לא קיים או המשתמש לא פעיל
        return res.status(401).json({ message: 'Unauthorized' })//להחזיר הודעת שגיאה

    }
    const match = await bcrypt.compare(password, foundUser.password)//בדיקה האם הסיסמא של המשתמש היא "שווה" לסיסמא המוצפנת
    if (!match)
        return res.status(401).json({ message: 'Unauthorized' })
    // res.send("Logged In")

    //ניצור אובייקט המכיל את הפרטים ללא הסיסמא
    const userInfo = { _id: foundUser._id, name: foundUser.name, roles: foundUser.roles, userName: foundUser.userName, email: foundUser.email }
    //ENV נחולל את הטוקן באמצעות  בהתאם לסיסמא השמורה בקובץ
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)//הפונקציה מקבלת את האובייקט וסיסמא לערבול-יצירת טוקן
    res.json({ accessToken: accessToken })//החזרת הטוקן
}
const register = async (req, res) => {//פונקצית כניסת משתמש חדש
    const { userName, password, name, email, phone } = req.body//כל הדברים שצריך לקבך מהמשתמש

    if (!name || !userName || !password) {//בדיקה אם הנתונים נכונים
        return res.status(400).json({ message: 'All fields are requierd' })
    }
    //אם הגענו לכאן -ז"א המשתמש כן הכניס את כל השדות

    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {//בודק אם שם המשתמש קיים
        return res.status(409).json({ message: "Duplicate userName" })//שגיאת כפילות נתונים
    }

    const hashedPwd = await bcrypt.hash(password, 10)//מערבל סיסמה מוצפנת
    const userObject = { name, email, userName, phone, password: hashedPwd }
    const user = await User.create(userObject)//יצירת משתמש
    if (user) {
        return res.status(201).json({ message: `New user ${user.userName}created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
// {
//     "userName":"345",
//     "name":"tamar",
//     "password":"2222"
// }
module.exports = { login, register }