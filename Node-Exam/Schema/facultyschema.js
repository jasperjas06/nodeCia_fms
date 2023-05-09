import mongoose from "mongoose";
import Joi from 'joi'



const Faculty=mongoose.model('faculty',new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   email:{
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },
   isStaff:{
    type: Boolean,
    default:true
   }
   

}));

const validateFaculty= (value) => {
    const schema = Joi.object({
      name: Joi.string().min(3),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(4),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Faculty;

export {validateFaculty}