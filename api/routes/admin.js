const express = require("express");
const { 
    createTalent, 
    deleteTalent, 
    getAllTalents,
    getFeatureds,
    getTalent, 
    getTalentByGender, 
    seachTalent, 
    updateTalent } = require("../controllers/talent");
// import { verifyAdmin, verifyUser } from "../utils/verifyAdmin.js";


const router = express.Router();

//SECONDARY ROUTES
//FEARURED
router.get("/talents/featured", getFeatureds)
router.get("/talents/all", getTalentByGender)
router.get("/talents/search_result", seachTalent)

// MAIN ROUTES
// CREATE
router.post("/", createTalent)
// router.post("/", verifyAdmin, createTalent)

// UPDATE
router.put("/talents/:id", /*verifyUser,*/ updateTalent)


//GET ALL
router.get("/", getAllTalents)

//GET TALENT
router.get("/talents/find/:id", getTalent)

//DELETE
router.delete("/talents/:id", /*verifyUser,*/ deleteTalent)




module.exports = router