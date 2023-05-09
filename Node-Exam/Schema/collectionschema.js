import mongoose from "mongoose";
// import Joi from 'joi'
// import Student from "./studentSchema.js";
// import Faculty from "./facultyschema.js";
// import Fund from "./fundschema.js";


const Collection=mongoose.model('collection',new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
},
   fundId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Fund'
   },
   facultyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Faculty'
   },
   status:{
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid']
   },
   dateof_fine:{
    type:Date,
    required:true
   },
   dateof_payment:{
    type:Date,
    default:null,
   },
   amount:{
    type:Number,
    default:0,
    
   }
   

}));

// const validateFaculty= (value) => {
//     const schema = Joi.object({
//       name: Joi.string().min(3),
//       email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//       password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(4),
//     });
//     const result = schema.validate(value)
  
//     return result  
//   };

export default Collection;

// export {validateFaculty}