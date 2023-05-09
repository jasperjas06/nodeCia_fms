import Student,{validateStudent} from '../Schema/studentSchema.js'
import hash from '../middleware/hashpassword.js'
import token from '../middleware/token.js'
import alert from 'alert'

const getStudent=async(req,res)=>{
    let result=await Student.find().select('-password')
    res.send(result)
}

const register = async(req,res) =>{
    const email = req.body.email
  
// console.log(email);
    const {error}=validateStudent(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const exUser=await Student.findOne({email: email})
    if(exUser){
        res.send("email is already taken")
    }
    else{
        try {
            let hashPassword=await hash.hashGenerater(req.body.password)
        let user=new Student({  
            name:req.body.name,
            reg_no:req.body.reg_no,
            course:req.body.course,
            batch:req.body.batch,
            email:req.body.email,
            password:hashPassword,
            section:req.body.section,
            date_of_registration:req.body.date_of_registration,
            department:req.body.department
        })
        const result=await user.save()
        alert('student registration sucessfull')
       res.send("Welcome" )

        } catch (error) {
            res.send(error.message)
        }

    }

}

const login=async(req,res) => {

    const email=req.body.email
    const password=req.body.password

    // const {error}=validateStudent(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    const User=await Student.findOne({email:email})
    if(User){
        const hashValue=await hash.hashValidater(password)
        if(!hashValue){
            res.send("Invalid Password")
        }
        else{
            try {
                let data=User.toObject();
            let id=data._id;
            // console.log(id);
          
    
            const getToken =await token.tokenGenrater(id);

            res.send(getToken);
            } catch (error) {
                res.send(error.message);
            }
        }
    }else{
        res.send("email id is Invalid")
    }
}

const oneStudent=async(req,res)=>{
   
    try {
        const user= await Student.findById( req.user._id).select("-password")
        
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

const UpdateStudent=async(req,res) => {
    const update=req.body
    let data= await Student.findOneAndUpdate({ _id: req.user._id }, { "$set":update}, {new:true})
          res.send(data)
    
console.log(data);

}



export default  {register,getStudent,login,oneStudent,UpdateStudent}