import Faculty,{validateFaculty} from "../Schema/facultyschema.js";
import hash from "../middleware/hashpassword.js";
import Fund from "../Schema/fundschema.js";
// import jwt  from "jsonwebtoken";
// import bcrypt from 'bcrypt'
// import token from "../auth/token";

// **************************************************Faculty Register**************************************************************
const register = async(req,res) =>{
    const email = req.body.email
  
// console.log(email);
    const {error}=validateFaculty(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const User=await Faculty.findOne({email: email})
    if(User){
        res.send("email is already taken")
    }
    else{
        try {
            let hashPassword=await hash.hashGenerater(req.body.password)
        let user=new Faculty({  
            name:req.body.name,
            email:req.body.email,
            password:hashPassword,
        })
        const result=await user.save()
        // alert('student registration sucessfull')
       res.send(user)

        } catch (error) {
            res.send(error.message)
        }
    }
}

const createFund= async(req,res)=>{
    try {
        const user=await new Fund({
            type:req.body.type,
            amount:req.body.amount,
            fundName:req.body.fundName,
            dateCreated:req.body.dateCreated
        })
        const result=await user.save()
        res.send(user)
        
    } catch (error) {
        res.send(error)
    }
    
}


export default {register,createFund}