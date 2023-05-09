import bcrypt from 'bcryptjs'

const saltRound=10;

const hashGenerater=async(plainpassword)=>{
    try {
        const salt=await bcrypt.genSalt(saltRound);
        const hash=await bcrypt.hash(plainpassword,salt);
        return hash;
    } catch (error) {
        return false;
    }
}

const hashValidater=async(plainpassword,hashPasswords)=>{
   try {
    const result=await bcrypt.compare(plainpassword,hashPasswords)
    return result;
   } catch (error) {
    return error.message;
   }
}




export default {hashGenerater,hashValidater}