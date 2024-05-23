const Baseket = require("../models/Basket");
//יצירת סל
const createNewBaseket = async (req, res) => {
    const { game } = req.body;
    if (!game) {
        return res.status(400).json({ message: ' game is required' })
    }   
        const baseket = await Baseket.create({ userName:req.user._id, game }) 
        if (baseket) {

            return res.status(201).json({ message: 'new baseket created' })
        }
        else {

            return res.status(400).json({ message: 'new baseket not created' })
        }
    
}
//מחיקת מוצר מסוים מהסל

// const delete1Baseket1 = async (req, res) => {
//     const {id, prodId } = req.body;
//     // console.log(_id, prodId, "_id, prodId");
//     if (!id || !prodId) {
//         return res.status(400).json({ message: ` fileds are required a` })
//     }
//     const baseket = await Baseket.findOne({ userName: id }).exec();
//     console.log(baseket, "baseket");
//     if (!baseket) {
//         return res.status(400).json({ message: ` no baseket found` })
//     }
//     baseket.game.remove(prodId);
//     const delete1Baseket = await baseket.save()
//     res.json(`'${delete1Baseket}'updated`)
// }





//לבדוק
//מחיקת סל שלם
// const deleteBaseket = async (req, res) => {
//     const { id } = req.params;
//     // console.log(id, "iddd");
//     if (!id) {
//         return res.status(400).json({ message: ` fileds are required` })
//     }
//     const baseketToDelete = await Baseket.findById(id).exec()
//     // console.log(baseketToDelete, "baseket");
//     if (!baseketToDelete) {
//         return res.status(400).json({ message: ` no baseket found` })
//     }
//     baseketToDelete.deleteOne();
//     const baseketTosave = await baseketToDelete.save();
//     res.json(`'${baseketTosave}'deleted`)
// }


// const deleteBaseket = async (req, res) => {
//     const {game} = req.body
//         const g = await Baseket.findById(id).exec()

//     if (!g) {
//         return res.status(400).json({ message: 'game not found' })
//     }
//     // const result = await Baseket.deleteOne()

//     const reqly = `game  deleted!!!!!!!!!!!!`;
//     res.json(reqly)
// }


const getBaseketById = async (req, res) => {
    // const { id } = req.params;
    // console.log(id, "id");
    const baseket = await Baseket.find({ userName:req.user._id }).populate("game").lean()///
    if (!baseket) {
        return res.status(400).json({ message: ` no baseket found` })
    }
    res.json(baseket)
}
const deleteBaseket = async (req, res) => {
    const { id } = req.body
    const game = await Baseket.findById(id).exec()
    if (!game) {
        return res.status(400).json({ message: 'game not found😔🎲' })
    }
    const result = await game.deleteOne()
    const reqly = `game '${result._id}' deleted!!!!!!!!!!!!`;
    res.json(reqly)
}
module.exports = { getBaseketById,deleteBaseket, createNewBaseket }

// //כותבים למעלה ב-postman
// http://localhost:7039/api/basket/userName/Prodoct- הוספת מוצר עפ"י שם משתמש 