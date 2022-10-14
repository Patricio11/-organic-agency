const express = require("express");
const { 
    createTalent,
    deleteTalent, 
    deleteTalentFiles, 
    documentsFileUpload, 
    getAllTalents, 
    getFeatureds, 
    getTalent, 
    getTalentByGender, 
    // getTalentByQuery, 
    // getTalentBySpeciality, 
    polaroidsFileUpload, 
    portfoleoFileUpload, 
    prifileUpload, 
    seachTalent, 
    updateTalent, 
    updateTalentFiles, 
    updateTalentJobHistoryDelete, 
    updateTalentSocialMedia, 
    videosFileUpload
} = require("../controllers/talent.js");
// import { verifyAdmin, verifyUser } from "../utils/verifyAdmin.js";


const router = express.Router();

const multer = require("multer")
const path = require("path")//importing to create the path for the files

const talentProfileBasePath = 'uploads/profiles';
const talentPortfoleoBasePath = 'uploads/portfoleo';
const talentPolaroidsBasePath = 'uploads/polaroids';
const talentVideosBasePath = 'uploads/videos';
const talentDocumentsBasePath = 'uploads/documents';
//Creating the path with the variable created in the Book modal
const uploadPath = path.join('public', talentProfileBasePath) 
const uploadPathPortfoleo = path.join('public', talentPortfoleoBasePath) 
const uploadPathPolaroids = path.join('public', talentPolaroidsBasePath) 
const uploadPathVideos = path.join('public', talentVideosBasePath) 
const uploadPathDocuments = path.join('public', talentDocumentsBasePath) 
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const videoMimeTypes = ['video/quicktime', 'video/mp4']
const documentsMimeTypes = ['images/jpeg', 'images/png', 'application/pdf']



const talentProfile = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPath)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})
const talentPortfoleo = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPathPortfoleo)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})
const talentPolaroids = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPathPolaroids)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})
const talentVideos = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPathVideos)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, videoMimeTypes.includes(file.mimetype))
    }
})
const talentDocuments = multer.diskStorage({
    //tell multer where the upload is going to be
    destination: (req, file, cb)=>{
        cb(null, uploadPathDocuments)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
        cb(null, documentsMimeTypes.includes(file.mimetype))
    }
})
//Configuring multer by creating the variavle to use on the create book roter
const upload = multer({ storage: talentProfile })
const uploadPortfoleo = multer({ storage: talentPortfoleo })
const uploadPolaroids = multer({ storage: talentPolaroids })
const uploadVideos = multer({ storage: talentVideos })
const uploadDocuments = multer({ storage: talentDocuments })

router.post("/upload/profile", upload.single('profileImg'), prifileUpload)
router.post("/upload/portfoleo", uploadPortfoleo.array('portfoleo'), portfoleoFileUpload)
router.post("/upload/polaroids", uploadPolaroids.array('polaroids'), polaroidsFileUpload)
router.post("/upload/videos", uploadVideos.array('videos'), videosFileUpload)
router.post("/upload/documents", uploadDocuments.array('documents'), documentsFileUpload)

// router.get("/upload/profile",  prifileUpload)
// router.post("delete/upload/videos", deleteTalentFiles)


//SECONDARY ROUTES
//FEARURED
router.get("/featured", getFeatureds)
router.get("/all", getTalentByGender)
// router.get("/speciality", getTalentBySpeciality)
router.get("/search_result", seachTalent)

// MAIN ROUTES
// CREATE
router.post("/", /*verifyAdmin,*/ createTalent)


// UPDATE
router.put("/:id",  updateTalent)
router.put("/social/:id",  updateTalentSocialMedia)
router.put("/:id/delete-jobHistory",  updateTalentJobHistoryDelete)
// router.put("/:id", verifyUser, updateTalent)
// UPDATE
router.put("/files/update/:id",  updateTalentFiles)
// router.put("/:id", verifyUser, updateTalent)
router.get("/files/delete",  deleteTalentFiles)


//GET ALL
router.get("/", getAllTalents)

//GET TALENT
router.get("/find/:id", getTalent)

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteTalent)



module.exports = router