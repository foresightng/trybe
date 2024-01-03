const mongoose = require('mongoose')
const User = require('./User')

const PaymentSchema = new mongoose.Schema({

    name: {
        type:String
    },

    amount:{
        type:String
    },

    currency:{
        type:String
    },

    redirect:{
        type:String,
      },

    redirectSuccess:{
        type:String,
    },

    redirectFailed:{
        type:String,
    },

    api:{
        type:String
    },

      status:{
        type:String,
        default:'incomplete'
      },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },

    createdAt: {
        type:Date,
    }

})




module.exports = mongoose.model('Payment', PaymentSchema)