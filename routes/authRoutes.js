const express=require("express")
const router=express.Router()//(שולח לפונקציה בתוך הדף)Router יצירת 

const authController=require("../controllers/authControllers")//controllersהפניה ל
router.post("/login", authController.login)//כניסה
router.post("/register",authController.register)//הרשמה-רישום משתמש חדש

module.exports=router//ייצוא

