// const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const {verifyToken} = require("./verifyToken");



exports.verifyUser = (req, res, next)=>{
    // res.json(req.user)
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized User!"));
        }
    })
}
exports.verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        // res.json(req.user.isAdmin)
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized Admin!"));
        }
    })
}