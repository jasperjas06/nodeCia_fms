import express from 'express';
import bodyParser from 'body-parser';
import DBconfig from './config/config.js';
import Student from './routes/studentroute.js';
import Hod from './routes/hodroute.js';
import faculty from './routes/facultyroute.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
DBconfig()


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use("/api/1p21mc018/student",Student)
// app.use("/api/1p21mc018/fine",Fine)
app.use("/api/1p21mc018/hod",Hod)
app.use("/api/1p21mc018/faculty",faculty)

const PORT=process.env.PORT || 3030
app.listen(PORT,()=>{
    console.log(`server running in ${PORT}  `);
})