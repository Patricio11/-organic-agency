const Talent = require("../models/Talent");


//CREATE
exports.createTalent = async (req, res, next)=>{
    const newTalent = new Talent(req.body);

    try {
        await newTalent.save();
        const response = await Talent.find({})
        
        res.status(201).json(response);
    } catch (err) {
        next(err)
    } 
}

//UPDATE TALENT
exports.updateTalent = async (req, res, next) =>{
    try{
        const upadatedTalent = await Talent.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body},
            {new: true}//To retrun the updated document
        )
        res.status(201).json(upadatedTalent);
    }catch(error){
        next(err)
    }
}

//GET TALENT
exports.getTalent = async (req, res, next) =>{
    try {
        const talent = await Talent.findById(req.params.id);
        res.status(201).json(talent);
    } catch (err) {
        next(err)//to go execute the error midleware
    }
}

//GET ALL TALENTS
exports.getAllTalents = async (req, res, next)=>{
   
    try {
        const allTalents = await Talent.find({})
        res.status(201).json(allTalents);
    } catch (error) {
        next(err);
    }
}

//DELETE
exports.deleteTalent = async (req, res, next)=>{
    // if(failed) return next(createError(401, "You are not authtenticated"));

    try {
        await Talent.findByIdAndDelete(req.params.id);
        const response = await Talent.findB();
        res.status(201).json(response)
    } catch (error) {
        next(err)//to go execute the error midleware
        
    }
}

//
//GET Featured TALENTS
exports.getFeatureds = async (req, res, next)=>{
    const isFeatured = true;
    try {
        const featuredTalents = await Talent.find({ featured: isFeatured})
        res.status(201).json(featuredTalents);
    } catch (error) {
        next(err);
    }
}
//GET TALENTS GENRE
exports.getTalentByGenre = async (req, res, next)=>{
   
    const genre = req.query.genre;
    const isFeatured = true;
    // const specialities = req.query.specialities;
    const influencers = req.query.influencers;

    try {
        if(genre){
            const getTalentByGender = await Talent.find({ 
                $and:[{genre: genre}, {featured:isFeatured}]
            })
            res.status(201).json(getTalentByGender);
        }else{
            const getTalentByGender = await Talent.find({isInfluencer:influencers})

            res.status(201).json(getTalentByGender);
        }
    } catch (error) {
        next(err);
    }
}

//SEACH TALENT
exports.seachTalent = async (req, res, next) =>{
    let searchOptions = {}
    if(req.query.search !== null && req.query.search !== ''){
        //RegExp funtion allow to search for the full sentence 
        //even if typed only the ititial and with 'i' tells to ignore the cases(like capital and lowercase)
        searchOptions.name = new RegExp(req.query.search, 'i')
    }
    try {
        const getTalentByGender = await Talent.find({ 
            $and:[searchOptions, {featured:true}]
        })
        res.status(201).json(getTalentByGender);
    } catch (error) {
        next(error);
    }
}