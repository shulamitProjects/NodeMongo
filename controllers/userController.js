// const User = require("../models/User")
// const createNewUser = async (req, res) => {
//     const { userName, id, name, email, phone, roles, active } = req.body
//     if (!userName) {
//         return res.status(400).json({ message: 'name is required ' })
//     }
//     const user = await User.create({ userName, id, name, email, phone, roles, active })
//     if (user) {
//         return res.status(201).json(user)
//     }
//     else {

//         return res.status(400).json({ message: 'new user not created' })
//     }

// }
// // const getAllUsers = async (req, res) => {
// //     const users = await User.find().lean()
// //     if (!users.length) {
// //         return res.status(400).json({ message: 'no users found' })

// //     }
// res.json(users)
// // }
// const updateUser = async (req, res) => {
//     const { userName, id, name, email, phone, roles, active } = req.body
//     if (!id || !userName) {
//         return res.status(400).json({ message: `fields are required` })
//     }
//     const user = await User.findById(id).exec()
//     if (!user) {
//         return res.status(400).json({ message: `user not found` })
//     }
//     user.userName = userName
//     user.id = id
//     user.name = name
//     user.email = email
//     user.phone = phone
//     user.roles = roles
//     user.active = active
//     const updatedUser = await user.save()
//     res.json(`'${updatedUser.userName}'updated`)
// }
// const deletUser = async (req, res) => {
//     const { id } = req.body

//     const user = await User.findById(id).exec()
//     if (!user) {
//         return res.status(400).json({ message: `user not found` })

//     }
//     const result = await user.deleteOne()
//     const replay = `User'${result.userName}'ID${result.id}deleted`
//     res.json(replay)
// }
// // const getUserById = async (req, res) => {
// //     const { id } = req.params
// //     const User = await User.findById(id).lean()
// //     if (!User) {
// //         return res.status(400).json({ message: ` no User found` })
// //     }
// //     res.json(user)
// // }
// // const updateUserComplate = async (req, res) => {
// //     const { id } = req.params
// //     const user = await User.findById(id).exec()
// //     if (!user) {
// //         return res.status(400).json({ message: `  user not found` })
// //     }
// //     user.complete = !user.complete
// //     const updateUser = await user.save()
// //     res.json(`'${updateUser.userName}'updated`)
// // }
// module.exports = { createNewUser,  updateUser, deletUser}//getAllUsers,getUserById,updateUserComplate

