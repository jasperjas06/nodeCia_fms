import mongoose from "mongoose";
import Joi from 'joi'

const Student=mongoose.model('Student',new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    reg_no:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    section:{
        type:String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    date_of_registration:{
        type:Date,
        default:Date.now(),
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    department:{
        type:String,
        required:true
    }
    
}));

const validateStudent= (value) => {
    const schema = Joi.object({
      name: Joi.string().min(3),
      reg_no:Joi.string(),
      course:Joi.string().min(3),
      batch:Joi.string().min(2),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(4),
      section:Joi.string().required(),
      department:Joi.string().required(),
      date_of_registration:Joi.date()
      

    });
    const result = schema.validate(value)
  
    return result  
  };

export default Student;

export {validateStudent}