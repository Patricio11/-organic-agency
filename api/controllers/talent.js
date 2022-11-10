const Talent = require("../models/Talent");
const fs = require("fs");
const path = require("path")//importing to create the path for the files


exports.prifileUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.file )
    // return response.data
    // return res.json(fileData)
}
exports.portfoleoFileUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.files )
    // return response.data
    // return res.json(fileData)
}
exports.polaroidsFileUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.files )
    // return response.data
    // return res.json(fileData)
}
exports.videosFileUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.files )
    // return response.data
    // return res.json(fileData)
}
exports.documentsFileUpload =  (req, res, next) =>{
    // const fileData = req.file.filename;
    res.status(201).json( req.files )
    // return response.data
    // return res.json(fileData)
}
// export const getUploadedFiles =  (req, res, next) =>{
//     // const fileData = req.file.filename;
//     res.status(201).json( req.file )
//     // return response.data
//     // return res.json(fileData)
// }

//CREATE
exports.createTalent =  async (req, res, next)=>{
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
    let fileBasePath = `uploads/profiles`;
    const deletePath = path.join('public', fileBasePath) 

    try{
        if(req.body.profileImg){
            const oldTalent = await Talent.findById(req.params.id);
            const oldFileName = oldTalent.profileImg
            const mainPath = deletePath+`/${oldFileName}`;
           
            fs.unlink(mainPath, (err)=>{
                if (err) {
                    console.error(err)
                    return
                }else{
                    console.log("File deleted!!..!!")
                }
            })
        }
        
        const upadatedTalent = await Talent.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body},
            {new: true}//To retrun the updated document
        )
        res.status(201).json(upadatedTalent);
    }catch(err){
        next(err)
    }
}

exports.updateTalentJobHistory = async (req, res, next) =>{
    
    try{
        const upadatedTalent = await Talent.updateOne(
            {_id:req.params.id},
            {$set: {'jobHistory.$[i]': req.body.jobHistory}},
            {arrayFilters:[ {'i._id': req.params.jobHistoryId}]},
            {new: true}
        )
        // const upadatedTalent = await Talent.update(
        //     {_id:req.params.id},
        //     {$set: {'jobHistory.$[i]': req.body.jobHistory}},
        //     {arrayFilters:[ {'i._id': req.params.jobHistoryId}]},
        //     {new: true}
        // )
        console.log(upadatedTalent)
        res.status(201).json(upadatedTalent);
    }catch(error){
        next(err)
    }
 
}

exports.updateTalentJobHistoryDelete = async (req, res, next) =>{
    
    try{
        
        const upadatedTalent = await Talent.findByIdAndUpdate(
            req.params.id, 
            { $pull: {jobHistory:req.body}},
            {new: true}//To retrun the updated document
        )
        
        res.status(201).json(upadatedTalent);
    }catch(error){
        next(err)
    }
   
}

exports.updateTalentSocialMedia = async (req, res, next) =>{
    // console.log(req.body)
    try{
        const upadatedTalentSocial = await Talent.findByIdAndUpdate(
            req.params.id, 
            { $push: req.body},
            // { $push: {'sizes' : req.body}},
            {new: true}//To retrun the updated document
        )
      
        console.log(upadatedTalentSocial)
        res.status(201).json(upadatedTalentSocial);
    }catch(err){
        next(err)
    }
}
//UPDATE TALENT FILES
exports.updateTalentFiles = async (req, res, next) =>{
    console.log(req.body)
    try{
        const upadatedTalent = await Talent.findByIdAndUpdate(
            req.params.id, 
            { $push: req.body},
            {new: true}//To retrun the updated document
        )
        console.log(upadatedTalent)
        res.status(201).json(upadatedTalent);
    }catch(err){
        next(err)
    }
}

exports.updateTalentFilesPosition = async (req, res) => {
    const { mediaFileList} = req.body
    const { activTab } = req.params

    try {
        switch (activTab) {
            case 'polaroids':
                for(const key in mediaFileList.reverse()){
                    const mediaFile = mediaFileList[key]
        
                    await Talent.findByIdAndUpdate(
                        {_id:req.params.talentId},
                        {$set: {'polaroids.$[i].position': key}},
                        {arrayFilters:[ {'i._id': mediaFile._id}]}
                    )
                }
                break;
            case 'portfoleo':
                for(const key in mediaFileList.reverse()){
                    const mediaFile = mediaFileList[key]
        
                    await Talent.findByIdAndUpdate(
                        {_id:req.params.talentId},
                        {$set: {'portfoleo.$[i].position': key}},
                        {arrayFilters:[ {'i._id': mediaFile._id}]}
                    )
                }
                break;
            case 'videos':
                for(const key in mediaFileList.reverse()){
                    const mediaFile = mediaFileList[key]
        
                    await Talent.findByIdAndUpdate(
                        {_id:req.params.talentId},
                        {$set: {'videos.$[i].position': key}},
                        {arrayFilters:[ {'i._id': mediaFile._id}]}
                    )
                }
                break;
        
            default:
                break;
        }

        const talent = await Talent.findById(req.params.talentId);
        res.status(201).json(talent)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteTalentFiles = async (req, res, next) =>{
    let fileBasePath = `uploads/${req.query.activeTab}`;
    const deletePath = path.join('public', fileBasePath) 
    const mainPath =deletePath+`/${req.query.delFile}`;
    

    let upadatedTalentMeadia={};
    try{
     
        switch (req.query.activeTab) {
            case 'polaroids':
                upadatedTalentMeadia = await Talent.findByIdAndUpdate(
                    req.query.talentId,
                    
                    {
                        $pull:{
                            // polaroids: { _id: req.query.fileId}
                            'polaroids': { _id: req.query.fileId }
                            
                        }
                    }, {new: true}
                )
                break;
            case 'portfoleo':
                    upadatedTalentMeadia = await Talent.findByIdAndUpdate(
                        req.query.talentId,
                    
                        {
                            $pull:{
                                // polaroids: { _id: req.query.fileId}
                                'portfoleo': { _id: req.query.fileId }
                                
                            }
                        }, {new: true}
                    )
                break;
            case 'videos':
                upadatedTalentMeadia = await Talent.findByIdAndUpdate(
                    req.query.talentId,
                    
                    {
                        $pull:{
                            // polaroids: { _id: req.query.fileId}
                            'videos': { _id: req.query.fileId }
                            
                        }
                    }, {new: true}
                )
                break;
        
            default:
                upadatedTalentMeadia={};
                break;
        }

       
        console.log(upadatedTalentMeadia)
        
        fs.unlink(mainPath, (err)=>{
            if (err) {
                console.error(err)
                return
            }else{
                console.log("File deleted!!..!!")
            }
        })
        res.status(201).json(upadatedTalentMeadia);
    }catch(error){
        next(error)
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
        console.log(allTalents);
        res.status(201).json(allTalents);
    } catch (error) {
        next(err);
    }
}

//DELETE
exports.deleteTalent = async (req, res, next)=>{
    
    const talet = await Talent.findById(req.params.id);
    let fileBasePath = "uploads/profiles";
    const deletePath = path.join('public', fileBasePath) 
    const mainPath =deletePath+`/${talet.profileImg}`;
    fs.unlink(mainPath, (err)=>{
        if (err) {
            console.error(err)
            return
        }else{
            console.log("File deleted!!..!!")
        }
    })

    try {
        
        await Talent.findByIdAndDelete(req.params.id,{new:true});
        const response = await Talent.find({});
        res.status(201).json(response)
    } catch (err) {
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
//GET TALENTS gender
exports.getTalentByGender = async (req, res, next)=>{
    const speciality = req.query.speciality;
   
    const gender = req.query.gender;
    const isFeatured = true;
    const influencers = req.query.influencers;
    console.log("Speciality: "+speciality);

    console.log(req.query);
    
    try {
        if(gender){
            const getTalentByGender = await Talent.find({ 
                $and:[{gender: gender}, {featured:isFeatured}]
            })
            res.status(201).json(getTalentByGender);
        }else if(influencers){
            const getTalentByGender = await Talent.find({isInfluencer:influencers})

            res.status(201).json(getTalentByGender);
        }else if(speciality){
            const getTalentBySpeciality = await Talent.find({specialities: { $in: [speciality]}})
            console.log(speciality);
            res.status(201).json(getTalentBySpeciality);
        }else{
            const getTalentByGender = await Talent.find({})
            res.status(201).json(getTalentByGender); 
        }
    } catch (err) {
        next(err);
    }
}
// export const getTalentBySpeciality = async (req, res, next)=>{
//     const speciality = req.query.spec;
   
//     const isFeatured = true;
//     console.log("Speciality: "+speciality);
//     try {
//         // $and:[{gender: gender}, {featured:isFeatured}]
//         if(speciality){
//             const getTalentBySpeciality = await Talent.find({specialities: { $in: [speciality]}})
//             console.log(speciality);
//             res.status(201).json(getTalentBySpeciality);
//         }
//     } catch (error) {
//         next(err);
//     }
// }

//SEACH TALENT
exports.seachTalent = async (req, res, next) =>{

    let search = req.query.search;
    // return req.query ltgt
    let categoryToSearch = req.query.search_category;
    
    console.log(categoryToSearch + '=' + search)
    
    if(search===''){
        console.log('Inside Empty Serach')
        const getTalent = await Talent.find({})
        console.log(getTalent.length)
        res.status(201).json(getTalent);

    }else if(categoryToSearch ==='gender'){
       console.log('Inside Gender')
        try {
            const getTalent = await Talent.find({ 
                
                gender: req.query.search
                // [req.query.search_category]: new RegExp(req.query.search, 'i')
                
            })
            console.log(getTalent)
            res.status(201).json(getTalent);
        } catch (error) {
            next(error);
        }
        
        
    }else if(categoryToSearch==='city' ){
        console.log('Inside City')
        try {
            const getTalent = await Talent.find({ 
                // $and:[searchOptions, {featured:true}]
                // city: new RegExp(req.query.search, 'i')
                [req.query.search_category]: new RegExp(req.query.search, 'i')
                // categoryToSearch: { $in: [searchOptions]}
                
            })
            console.log(getTalent)
            res.status(201).json(getTalent);
        } catch (error) {
            next(error);
        }
    }else if(categoryToSearch ==='lt'){
        console.log('Inside Age')
        try {
            const getTalent = await Talent.find({ 
                age: { $lte: req.query.search }
                
            })
            console.log(getTalent)
            res.status(201).json(getTalent);
        } catch (error) {
            next(error);
        }
    }else if(categoryToSearch==='gt'){
        console.log('Inside Age')
        try {
            const getTalent = await Talent.find({ 
                age: { $gte: req.query.search }
                
            })
            console.log(getTalent)
            res.status(201).json(getTalent);
        } catch (error) {
            next(error);
        }
    }else{
        console.log('Else All')
        let talentName =''
        if(req.query.search !== null && req.query.search !== ''){
            //RegExp funtion allow to search for the full sentence 
            //even if typed only the ititial and with 'i' tells to ignore the cases(like capital and lowercase)
            talentName = new RegExp(req.query.search, 'i')
            // searchOptions.name = new RegExp(req.query.search, 'i')
        }
        // if(req.query.search.length !== 0){

        // }
        console.log(req.query.search_category)
        try {
            const getTalent = await Talent.find({ 
                name: talentName
            })
            console.log('In else getTalent')
            console.log(getTalent.length)
            res.status(201).json(getTalent);
        } catch (error) {
            next(error);
        }
    }
    

    

   
}