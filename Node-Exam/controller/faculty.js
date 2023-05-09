import Faculty,{validateFaculty} from "../Schema/facultyschema.js";
import hash from "../middleware/hashpassword.js";
// import jwt  from "jsonwebtoken";
// import bcrypt from 'bcrypt'
import token from "../middleware/token.js"
// import Fund from "../Schema/fundschema.js"
import Collection from "../Schema/collectionschema.js";
import Fund from "../Schema/fundschema.js";
import Student from "../Schema/studentSchema.js";

//**************************************************** Login*****************************************
const login= async(req,res)=>{
    // validateFaculty(req.body)
    try {const email=req.body.email;
        const password=req.body.password;
        
            const User=await Faculty.findOne({email:email})
        if(User){
            const hashValue=await hash.hashValidater(password)
            if(!hashValue){
                res.send("password is in valid")
            }
            else{
                let data=User.toObject();
                let id=data.id;
                let staff=data.isStaff;
                // let staff=data.staff;
                console.log(data);
                const getToken =await token.tokenGenrater(id,staff);
    
                res.header("value",getToken).send("login in");
            }
        }
        else res.send("invalid email")
        
    } catch (error) {
        res.send(error)
    }
    
    
}
// ############################################################ADD FINE##########################################################
const addFine=async(req,res) => {
    try {
        let fine=new Collection({
            studentId:req.body.studentId,
            fundId:req.body.fundId,
            facultyId:req.body.facultyId,
            status:req.body.status,
            dateof_fine:req.body.dateof_fine,
            dateof_payment:req.body.dateof_payment   
        })
        const result=await fine.save();
        res.send(result);

    } catch (error) {
        res.send(error.message)
    }
}
// *************************************************Bulk Fund************************************************************************
const bulkfine=async (req,res)=>{
    let dept=req.body.dept;
    try {
        const stu=await Student.find({department:dept},{_id:1})
        if(!stu)res.send('no payment on this dept')
        console.log(stu);
        for(let i=0;i<stu.length;i++){
            let fine=new Collection({
                        studentId:stu[i]._id,
                        fundId:req.body.fundId,
                        facultyId:req.body.facultyId,
                        status:req.body.status,
                        dateof_fine:req.body.dateof_fine,
                        dateof_payment:req.body.dateof_payment   
                    })
                    const result=await fine.save();
        }
        res.send("fine added")
    } catch (error) {
        res.send(error.message)
    }
}
// const viewpayment=async(req,res)=>{
//     try {
//         const data=await Collection.find({studentID:req.user._id}).populate({path:['student_id','fund_id','faculty_id']})
//         // if(data.length==0)return res.send('no Payment for u')
//         // return 
//         res.send(data)
//     } catch (error) {
//         return res.send(error.message)
//     }
// }


// ************************************************** viewpayment***************************************************************
const viewmypayment=async(req,res)=>{
    try {
        
        const data=await Fund.find({studentId:req.user._id}).populate([{path:'studentId',select:'name'},{path:'facultyId',select:'name'},{path:'fundId',select:'fundName'}])
        if(data.length==0)return res.send('no Payment for u')
        let count=data.length;
        const paidcount=await Payment.find({$and:[{studentId:req.user._id},{status:'paid'}]}).count()
        const pendingcount=await Payment.find({$and:[{studentId:req.user._id},{status:'pending'}]}).count()
        const unpaidcount=await Payment.find({$and:[{studentId:req.user._id},{status:'not paid'}]}).count()

        return res.send(` Your Total Payment count is  ${count} , paicount is ${paidcount} , pending is ${pendingcount}, unpaid is ${unpaidcount}  `+ data)
    } catch (error) {
        return res.send(error.message)
    }
}

//******************************update payment*********************************************** */

const Update=async (req, res) => {
    try {
 const _id=req.body.studentId;
        let update=await Collection.findOneAndUpdate({_id:_id},{$set:{status:req.body.status,Dateof_payment:req.body.Dateof_payment,amount:req.body.amount}},{new:true})

        res.send(update)

    } catch (error) {
        res.status(400).send(error.message)
    }
}


export default {login, addFine,viewmypayment,bulkfine,Update }