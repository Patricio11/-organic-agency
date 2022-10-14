const jwt = require("jsonwebtoken");
const { createError } = require("./error");
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