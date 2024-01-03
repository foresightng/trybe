const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: [2, 'Name too short'],
        maxLength: [50, 'Name too long'],
        lowercase: true
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: [2, 'Name too short'],
        maxLength: [50, 'Name too long'],
        lowercase: true
    },

    country:{
        type:String,
    },

    state:{
        type:String,
    },

    address:{
        type:String,
    },

    city:{
        type:String,
    },

    postalCode:{
        type:Number,
    },

    dateOfBirth:{
        type:String,
    },

    gender:{
        type:String,
    },

    bvn:{
        type:String,
    },

    isSoleProprietor:{
        type:Boolean,
        default:false
    },

    description:{
        type:String,
    },

    businessName: {
        type: String
    },


    googleId:{
        type:String,
        unique:true,
        sparse:true
    },

    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number'],

    },

    uniqueKey: {
        type: Number,
        default: 9292
    },


    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [3, 'Password must be at least 3 characters']
    },


    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true,
        lowercase:true,
    },

    accountNumber:{
        type:String
    },

    bank:{
        type:String
    },

    role: {
        type: String,
        enum: ['customer', 'admin', 'vendor'],
        default:'customer',
        required: [true, 'Please select a role'],
        lowercase: true,
    },


    createdAt: {
        type: Date,
        default:Date.now()
    },

    dob:{
        type:Date
    },

    resetPasswordToken:{
        type:Number
    },

    resetPasswordExpires:{
        type:Date
    }

})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



UserSchema.methods.createJWT = function () {
    return jwt.sign({
        userid: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        state: this.state,
        address: this.address,
        city: this.city,
        postalCode: this.postalCode,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        bvn: this.bvn,
        isSoleProprietor: this.isSoleProprietor,
        description: this.description,
        businessName: this.businessName,
        googleId: this.googleId,
        phoneNumber: this.phoneNumber,
        uniqueKey: this.uniqueKey,
        email: this.email,
        accountNumber: this.accountNumber,
        bank: this.bank,
        role: this.role,
        createdAt: this.createdAt,
        dob: this.dob,
    }, process.env.JWT_SECRET, {
        expiresIn: "365d",
    });
};

UserSchema.methods.comparePassword = async function (loginPassword) {
    const isMatch = await bcrypt.compare(loginPassword, this.password)
    console.log("isMatch:", isMatch)
    return isMatch
}



module.exports = mongoose.model('User', UserSchema)