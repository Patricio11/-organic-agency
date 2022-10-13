const express = require("express");
const { 
    addPresentationRole, 
    addTalentToRole, 
    createPresentation, 
    deletePresentation, 
    getAllPresentations, 
    getPresentation, 
    jobLogoUpload, 
    removePresentationRole, 
    removeTalentToRole, 
    updatePresentation 
} = require("../controllers/presentation");

const router = express.Router();

const multer = require("multer")
const path = require("path")//importing to create the path for the files

const presentationBasePath = 'uploads/presentation';

const uploadPathPresentation = path.join('public', presentationBasePath) 

const jobPresentation = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPathPresentation)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})

//Configuring multer by creating the variavle to use on the  roter
const uploadPresentation = multer({ storage: jobPresentation })

//CREATE
router.post("/", createPresentation);
//Upload jobLogo
router.post("/upload", uploadPresentation.single('jobLogo'), jobLogoUpload)
//GET ALL
router.get("/", getAllPresentations);
// GET ONE
router.get("/:id", getPresentation);
//UPDATE
router.put("/:id", updatePresentation);
//UPDATE ADD PRESENTATION ROLE
router.put("/:id/update", addPresentationRole);
//UPDATE ADD PRESENTATION ROLE
router.put("/:id/remove/role/:roleId", removePresentationRole);
router.put("/:id/update/role/:roleId", addTalentToRole);
router.put("/:id/remove/role/:roleId/talent", removeTalentToRole);
//DELETE
router.delete("/:id", deletePresentation);

module.exports = router