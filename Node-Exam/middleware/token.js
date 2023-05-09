import jwt from 'jsonwebtoken'

const tokenGenrater=async(_id)=>{
    try {
        const token=jwt.sign({_id},process.env.JWTKEY,{expiresIn:"500s"})
    return token;
    } catch (error) {
        console.log(error);
    }
}

const tokenValidater=async(token)=>{
    try {
        const data=jwt.verify(token,process.env.JWTKEY);
        return data;
    } catch (error) {
        return false;
    }
}





export default {tokenGenrater,tokenValidater};