import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password:{
        type: String,
    },
}, {timestamps: true})

const carSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    },
    images:{
        type: Array,
        max: 10,
    },
    userId:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Car = mongoose.models?.Car || mongoose.model("Car", carSchema);