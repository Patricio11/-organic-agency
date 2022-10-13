const mongoose = require('mongoose');
const Talent = require('./Talent');

const PresentationSchema = new mongoose.Schema({
    name: {
        type:String
    },
    productImage: {
        type: String
    },
    pDate: {type: Date, default: () => Date.now()},
    roles:[{
        name: String,
        date: {type: Date, default: () => Date.now()},
        talents:[{
            type: mongoose.Schema.ObjectId,
            // type: mongoose.Schema.Types.ObjectId,
            ref: 'Talent',
            // index:true,
            unique: true
        }],
    }],
    // talents: [{
    //     talent_id: {
    //         type: mongoose.Schema.ObjectId,
    //         ref: Talent,
    //         index:true
    //     },
    //     role: {type: String},
    //     date: {type: Date},
        
    // }]
})


module.exports = mongoose.model('Presentation', PresentationSchema);