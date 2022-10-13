const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");

//To verify the token 
exports.verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;

    if(!token){
        return next(createError(401, "You are not authenticated! No Token"))
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(401, "Token is not valid"));

        req.user = user;
        next() //to go to next function
    })
}

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