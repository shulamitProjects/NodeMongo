const express = require("express")
const router = express.Router()
const baseketController = require("../controllers/BaseketControllers")
const verifyJWT=require("../middleware/verifyJWT")//מכיל מילדוואר על כולם



router.get("/",verifyJWT, baseketController.getBaseketById)
// router.put("/:id/:prodId", baseketController.updateBaseket)
router.delete("/",verifyJWT, baseketController.deleteBaseket)
router.post("/",verifyJWT, baseketController.createNewBaseket)

module.exports = router
