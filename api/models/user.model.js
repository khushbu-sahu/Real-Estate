import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
    },
    email:{
        type : String,
        required: true,
        unique: true,
    },
    password:{
        type : String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://as1.ftcdn.net/v2/jpg/05/60/26/08/1000_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg"
    },

}, {timestamps: true});

const User = mongoose.model('User' , userSchema);

export default User;