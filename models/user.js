import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    username: {type: String, required: true,unique: true, lowercase: true, trim: true,},
    profilepic: {type: String, 
        // required: true
    },
    coverpic: {type: String, 
        // required: true
    },
    razorpaySecret: {type: String,
        // required: true
    },
    // Add other fields as needed
    razorpayId: {type: String,
        // required: true
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});


export default mongoose.models.User || model("User", userSchema) ;