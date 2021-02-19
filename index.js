var express = require("express")
app = express();
const mongoose = require("mongoose");
const connection = require('./connection/connect');
const jwt = require('jsonwebtoken');
var router = express.Router();
let userSchema = require('./Model/user')
const date = require("date-and-time")
const now = new Date()
let userTask = require('./Model/task')
const bcrypt = require('bcryptjs');
const { authentication } = require("./auth");
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
app.use(express.json());
const port = 7001;
app.listen(port,()=>{
    console.log('server is up on port' + port)
})
connection.connect()
router.post('/registration',async (req,res)=> {
    const obj = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    const hashedPassword = await bcrypt.hash(obj.password, saltRounds)//for hashing
    obj.password = hashedPassword//save the password in hashing form
    const newUser = await userSchema.create(obj)//from body
    res.send('done')

    console.log(newUser)   //print the result on console screen 
})  
app.use(router)

router.post('/login', async (req,res)=>{
   const email = req.body.email;
   const password = req.body.password;
   try{
            const alreadyExist = await userSchema.findOne({email:email})
            if (alreadyExist == null){
            return res.status(401).send("Can't find the user")}
            console.log(req.body)
            console.log(await bcrypt.compare(password,alreadyExist.password));
       if(await bcrypt.compare(password,alreadyExist.password)){
        var token = jwt.sign({_id:alreadyExist._id},"rs");
           res.json("success " + token)
       }
       else{
         res.json("Invalid User")
       }
    } catch (error) {
        return res.sendStatus(500).send(
            {
                message:error
            }
        )
        
    }
})

router.post('/task',authentication,async(req,res,next)=>{
    
    req.body.userId=req.decoded._id 
    const newTask = await userTask(req.body)
    const data = await newTask.save();
    console.log(data);
})  
router.put('/updatetask/:id',authentication,async(req,res,next)=>{
    try {
        console.log(req.decoded)
        console.log(req.params.id);
        const compdate=date.format(now,'YYYY/MM/DD HH:mm:ss')
        const newTask = await userTask.findByIdAndUpdate({_id:req.params.id},{completed:true, completed_on:compdate},{new:true})
        console.log(newTask)
        res.send({status:200,message:"updated"})
        
    } catch (error) {
        console.log(error,"errorrrrrrr");
        res.status(400)
    }
    })
 

router.get('/getalltask',authentication,async(req,res)=>{
    const alltask = await userTask.find({userId:req.decoded._id}).sort({"completed":-1})
    res.send(alltask)
    console.log(alltask)

})
