const Products = require("../models/Products")
//יצירת משחק חדש
const createNewGame = async (req, res) => {
    console.log("a");
    const { name, password, description, price,picture,only} = req.body
    console.log("b");

    if (!name || !password || !price) {
        return res.status(400).json({ message: 'Game is required' })
    }
    const duplicate = await Products.findOne({ password: password }).lean()
    if (duplicate) {//בודק אם שם המשתמש קיים
        return res.status(409).json({ message: "Duplicate game" })//שגיאת כפילות נתונים
    }

    const game = await Products.create({ name, password, description, price,picture,only })
    if (game) {
        return res.status(201).json({ message: 'New game created' })
    } else {
        return res.status(400).json({ message: 'Invalid game' })
    }
}


//Update (Modle instance)
const updategame = async (req, res) => {
    const { id } = req.params
    const {name,description, price,picture,only} = req.body
    // if (!name) {
    //     return res.status(400).json({ message: 'fields are require' })
    // }
    console.log("almost update");
    const game = await Products.findById(id).exec()
    console.log("almost almost");

    if (!game) {
        return res.status(400).json({ message: 'game not found' })
    }
    console.log("almost gaaa");

    game.name = name
    game.description = description
    game.price = price
    game.picture=picture
    game.only=only

    console.log("almost bbbb faild here");
    const updategame = await game.save()
    console.log("finish update ");

console.log("updater");
    res.json(`'${updategame.name}'updated`)
}


// {
//     "id":"64ad51e4c93f40177b90850a",
//     "name":"bobb",
//     "password":"987",
//     "const":"50"
// }
    

const deletegame = async (req, res) => {
    const { id } = req.params
    const game = await Products.findById(id).exec()
    if (!game) {
        return res.status(400).json({ message: 'game not found' })
    }
    const result = await game.deleteOne()
    const reqly = `game '${result.name}' ID ${result.password} deleted`
    res.json(reqly)
}

const getgameById = async (req, res) => {
    const { password } = req.params
    //Get isngle game from MongoDB
    const game = await Products.findById(password).lean()

    //if no games
    if (!game) {
        return res.status(400).json({ message: 'No game found' })
    }
    res.json(game)
}

const getAllGames = async (req, res) => {
    console.log("getAllGames");
    const game = await Products.find().lean()
    console.log(" after");
    //if no games
    if (!game) {
        return res.status(400).json({ message: 'No game found' })
    }
    res.json(game)
}

//Update complete
const updategameComplete = async (req, res) => {
    const { id } = req.params
    //Confirm data
    const game = await Products.findById(id).exec()

    if (!game) {
        return res.status(400).json({ message: 'game not found' })
    }
    game.complete = !Products.complete
    res.json(`'${updategame.name}' updated`)
}
module.exports = { createNewGame, updategame, deletegame, getgameById, updategameComplete,getAllGames };//getAllGames,
// {"name":"colors",
// "password":"1",
// "description":"100 strong colors and all shades of the rainbow",
// "price":25,
// "picture":"1.png"
// }