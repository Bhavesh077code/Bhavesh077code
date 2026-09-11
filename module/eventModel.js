
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    
    },
    location:{
        type: String,
       
    },
    date: {
        type: Date,
      
    },
    image: {
        type: String,
        default: null
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Event = mongoose.model('Event', eventSchema);