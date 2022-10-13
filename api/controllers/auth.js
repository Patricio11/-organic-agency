const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");

exports.register = async (req, res, next) =>{
    try {
        
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

        const newUser = new User({
           ...req.body,
            password:hashedPassword,
        })


        await newUser.save()
        res.status(200).send("User has been created.")
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404, "User not found"))//create error is there is one

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))
        
        //Asigning user values to JWT token for cookies to use when login to see is is admin or not
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT)//here we get the secret (JWT) key from the env file

        // res.status(201).json(user)
        //To avoide sending the password and unnecessary info (descontract the object )
        //Here we are sending everything except the (password and the isAdmin) 
        //and use ._doc to get only the information object withought the other objects
        const { password, isAdmin, ...otherDetails} = user._doc; 
        //Use cookieparser to store the jwt token into the cookie 
        //and import it inside the index server file as middleware
        res.cookie("access_token", token, {
            // httpOnly: true, //the most important configuration for cookies (does not allow any client secrate tool to acces this cookie)
        }).status(200).json({details:{...otherDetails}, isAdmin});
    } catch (err) {
        next(err);
    }
}
