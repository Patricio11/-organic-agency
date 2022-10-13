const Presentation = require("../models/Presentation");
const fs = require("fs");
const path = require("path")//importing to create the path for the files

//CREATE
exports.createPresentation = async (req, res, next)=>{
    const newPresentation = new Presentation(req.body);

    try {
        const savedPresentation = await newPresentation.save();
        console.log(savedPresentation)
        res.status(201).json(savedPresentation);
    } catch (err) {
        next(err)
    } 
}

exports.jobLogoUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.file )
    // return response.data
    // return res.json(fileData)
}

//UPDATE Presentation
exports.updatePresentation = async (req, res, next) =>{
    try{
        const upadatedPresentation = await Presentation.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body},
            {new: true}//To retrun the updated document
        )
        res.status(201).json(upadatedPresentation);
    }catch(error){
        next(err)
    }
}
exports.addPresentationRole = async (req, res, next) =>{
    try{
        await Presentation.findByIdAndUpdate(
            req.params.id, 
            { $push: req.body},
            {new: true}//To retrun the updated document
        )

        const upadatedPresentation = await Presentation.findById(req.params.id).populate('roles.talents')

        res.status(201).json(upadatedPresentation);
    }catch(error){
        next(err)
    }
}
exports.removePresentationRole = async (req, res, next) =>{
    try{

        await Presentation.findOneAndUpdate(
            {_id:req.params.id},
            {
                $pull: {
                    'roles': {_id: req.params.roleId}
                }
            },
            {new: true}
        )
        

        const upadatedPresentation = await Presentation.findById(req.params.id).populate('roles.talents')
        
        res.status(201).json(upadatedPresentation);
    }catch(error){
        console.log(error)
    }
}
exports.addTalentToRole = async (req, res, next) =>{
    try{

        // await Presentation.updateOne(
        //     {"roles._id": req.params.roleId}, 
        //     {
        //         $push:{'roles.$.talents': req.body.talents}
        //     }
        // )

        await Presentation.findOneAndUpdate(
            {$and:[{_id:req.params.id},{'roles._id': req.params.roleId}]},
            {
                $push: {
                    'roles.$.talents': req.body.talents
                }
            },
            {new: true}
        )
        const updatedPRoles = await Presentation.findById(req.params.id).populate('roles.talents')
        // console.log(updatedPRoless)
        res.status(201).json(updatedPRoles);
    }catch(error){
        console.log(error)
    }
}
exports.removeTalentToRole = async (req, res, next) =>{
    try{
        await Presentation.findOneAndUpdate(
            {$and:[{_id:req.params.id},{'roles._id': req.params.roleId}]},
            {
                $pull: {
                    'roles.$.talents': req.body.talents
                }
            },
            {new: true}
        )
        const updatedPRoles = await Presentation.findById(req.params.id).populate('roles.talents')
        // console.log(updatedPRoless)
        res.status(201).json(updatedPRoles);
    }catch(error){
        console.log(error)
    }
}

//GET Presentation
exports.getPresentation = async (req, res, next) =>{
    try {
        const getOneP = await Presentation.findById(req.params.id).populate('roles.talents');
        res.status(201).json(getOneP);
    } catch (err) {
        next(err)//to go execute the error midleware
    }
}

//GET ALL PresentationS
exports.getAllPresentations = async (req, res, next)=>{
    try {
        const allPresentations = await Presentation.find({}).populate('roles.talents')
        
        res.status(201).json(allPresentations);
    } catch (err) {
        next(err);
    }
}

//DELETE
exports.deletePresentation = async (req, res, next)=>{
    // if(failed) return next(createError(401, "You are not authtenticated"));

    const presentation = await Presentation.findById(req.params.id);
    let fileBasePath = "uploads/presentation";
    const deletePath = path.join('public', fileBasePath) 
    const mainPath = deletePath+`/${presentation.productImage}`;
    fs.unlink(mainPath, (err)=>{
        if (err) {
            console.error(err)
            return
        }else{
            console.log("File was deleted!!..!!")
        }
    })

    try {
        await Presentation.findByIdAndDelete(req.params.id);
        const response = await Presentation.find({});
        // res.status(201).json("Presentation deleted")
        res.status(201).json(response)
    } catch (error) {
        next(err)//to go execute the error midleware
        
    }
}