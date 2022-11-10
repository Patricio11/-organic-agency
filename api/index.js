//To check if we're running in the production invironment or not 
const dotenv = require("dotenv");
const express = require("express")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")
const talentsRoute = require("./routes/talents.js")
const adminRoute = require("./routes/admin.js")
const presentationRoute = require("./routes/presentation.js")


const app = express()
if (process.env.NODE_ENV !== 'production'){
    dotenv.config()
}
//Tell the server to allow request from specific address
// We install cors to allow request from specifyed locations to out API
const whitelistUrl = [process.env.FRONTEND_ADDRESS_ADMIN, process.env.FRONTEND_ADDRESS_CLIENT]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelistUrl.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}
// app.use(cors({}))
app.use(cors({
    origin: corsOptions,
    credentials: true // to allow access to cookies 
}))

//To create the __dirname
const { dirname } =require( 'path');
const { fileURLToPath } = require( 'url');
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const __dirname = dirname(fileURLToPath(require('url').pathToFileURL(__filename).toString()));
//End

//Tell express where out public files are going to be
app.use(express.static('public'));
// app.use(express.static('public/uploads/profile')); 
app.use(__dirname+'public', express.static(__dirname+'uploads/profiles'));
app.use(__dirname+'public', express.static(__dirname+'uploads/polaroids'));
app.use(__dirname+'public', express.static(__dirname+'uploads/portfoleo'));
app.use(__dirname+'public', express.static(__dirname+'uploads/videos'));

// app.use( express.static(__dirname+'/uploads/profiles'));

/** Connecting to the DB */
/*using process.even because we con't want to hardcode the database location
* so that when is deplayed we don't come here and change again
*/

const connect = async () => {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL, 
            {useNewUrlParser:true}
        )
        console.log("connected to MongoDB")
    }catch(error){
        throw(error)
    }
}
const db = mongoose.connection;
db.on('disconnected', () => {
    console.log("MongoDb Disconnected!")
})
//listen the app to a port and colling the connect to DB function
//process.env.PORT when we deplay and the hosting server tell us where to listen
app.listen(process.env.PORT || 8800, () => {
    connect()
    console.log('Connected to Backend')
})

//Middleware to allow express to send data in JSON, because by default Express server does not allow
app.use(express.json());
//Middlewares
app.use(cookieParser()); // to allow the server to use cookie
//will use the route and will look for the endpoint in the route file
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/talents", talentsRoute);
app.use("/api/admin", adminRoute);
app.use("/api/presentation", presentationRoute);
// app.use("/api/public", talentsRoute);


//Middleware for error handling
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
