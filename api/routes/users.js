const express = require("express");
const { deleteUser, getAllUsers, getUser, updateUser } = require("../controllers/user");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyAdmin");

const router = express.Router();

// router.get("/checkusers", verifyToken, (req,res,next)=>{
//     res.send("Hello user, You're logged in")
// })
// router.get("/checkusers/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello user, You're logged in and you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello Admin, You're logged in and you can delete All accounts")
// })
// UPDATE
router.put("/:id", verifyUser, updateUser)

//GET User
router.get("/:id", verifyUser, getUser)

//GET ALL Users
router.get("/", verifyAdmin, getAllUsers)

//DELETE
router.delete("/:id", verifyAdmin, deleteUser)

module.exports = router;