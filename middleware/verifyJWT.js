const jwt = require('jsonwebtoken')
const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization//authorization מקבלים הידר הנקרא

    if (!authHeader?.startsWith('Bearer '))//אם לא קיים או שלא מתחיל בבירר
        return res.status(401).json({ message: 'Unauthorized' })//המשתמש לא ממשיך לאותה קריאה(לא מורשה)
console.log("very")
    const token = authHeader.split(' ')[1]//לוקח כל מילה בנפרד(עפ"י רווחים) ומחזיר את הטוקן
    console.log(token)
    jwt.verify(
        token,//קובץ
        process.env.ACCESS_TOKEN_SECRET,//סיסמא
        (err, decoded) => {// שגיאה או הצלחה
            console.log({decoded});
            if (err) return res.status(403).json({ message: 'Fobidden😔' })//אם קיים שגיאה תחזיר לא מורשה
            req.user = decoded//מוסיפים למשתמש את האובייקט שקודדנו
            next()//אם אין שגיאה נמשיך לקריאה הבאה
            console.log("fy")

        }
    )
}
module.exports = verifyJWT