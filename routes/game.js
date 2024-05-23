const express = require("express")
const router = express.Router()
// const verifyJWT=require("../middleware/verifyJWT")//מכיל מילדוואר על כולם

const gameController = require("../controllers/gameController")
console.log("route");
debugger;
router.get("/", gameController.getAllGames)
router.get("/:id", gameController.getgameById)
router.post("/", gameController.createNewGame)
router.delete("/:id", gameController.deletegame)
router.put("/:id", gameController.updategame)
router.put("/complete/:id", gameController.updategameComplete)
module.exports = router