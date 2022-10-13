const mongoose = require('mongoose');


const TalentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    dateOfBirth:{
        type: Date
    }, 
    age:{
        type: Number
    }, 
    gender:{
        type: Number,
        required: true
    },
    isMainboard: {
        type: Boolean,
        default: false
    },
    isImage: {
        type: Boolean,
        default: false
    },
    isTimeless: {
        type: Boolean,
        default: false
    },
    isInfluencer: {
        type: Boolean,
        default: false
    },
    isActor: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    socialMedia:[{
        facebook:{type:String},
        tiktok: {type:String}, 
        instagram:{type:String}
    }],
    specialities: [String],
    sports: [String],
    arts: [String],
    languages: [String],
    otherQualities: [String],

    sizes: [{
        height: {type :String}, 
        bust: {type:Number}, 
        waist: {type:Number}, 
        hips: {type:Number},
        dress: {type:Number},
        shoe: {type:String},
        hair: {type:String},
        eyes: {type:String},
    }],
    address: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    jobHistory: [{
        product: {type: String},
        year: {type: Number},
        duraction: {type: String},
        exclusivity: {type: String},
        territories:[String],
        featured: {Boolean},
    }],
    documents:[{
        filename: {type:String},
        doc_type: {type:String}
    }],
    profileImg:{
        type: String
    },
    polaroids:[{
        filename: {type: String}, 
        isProfile:{type: Boolean,default: false}, 
        isVisible:{type: Boolean,default: true}
    }],
    portfoleo:[{
        filename: {type:String}, 
        isProfile:{type: Boolean,default: false}, 
        isVisible:{type: Boolean,default: true}
    }],
    videos:[{
        filename: {type:String},
        isMain:{type: Boolean,default: false}, 
        isVisible:{type: Boolean,default: true}
    }]
},
{timestamps:true}
)

module.exports = mongoose.model('Talent', TalentSchema);