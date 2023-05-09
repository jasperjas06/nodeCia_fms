import mongoose from "mongoose";
import Joi from 'joi'



const Fund=mongoose.model('fund',new mongoose.Schema({
    
    type: {
        type: String,
        required: true,
        enum: ['Fine', 'Fees']
    },
    amount: {
        type: Number,
        required: true,
    },
    fundName: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    } 

}));



 

const validateFund= (value) => {
   const schema = Joi.object({
     type: Joi.string().required(),
    amount: Joi.number().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).max(10).required(),
  });
}

export default Fund;

export {validateFund}