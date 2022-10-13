const User = require("../models/User");


//UPDATE User
exports.updateUser = async (req, res, next) =>{
    // return res.json(req.params.id)
    try{
        //To retrun the updated document
        const upadatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true}
        )
        res.status(201).json(upadatedUser);
    }catch(err){
        next(err)
    }
}

//GET User
exports.getUser = async (req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch (err) {
        next(err)//to go execute the error midleware
    }
}

//GET ALL UserS
exports.getAllUsers = async (req, res, next)=>{
    try {
        const allUsers = await User.find({})
        res.status(201).json(allUsers);
    } catch (error) {
        next(err);
    }
}

//DELETE
exports.deleteUser = async (req, res, next)=>{
    // if(failed) return next(createError(401, "You are not authtenticated"));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json("User deleted")
    } catch (error) {
        next(err)//to go execute the error midleware
        
    }
}