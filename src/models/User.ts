import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default: '',
    },
    password:{
        type: String,
        required: true,
        minlenght: 6,
    },
    emailVerified:{
        type: Boolean,
        default: false,
    },
    phone:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default:'user',
    },

})


const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;
