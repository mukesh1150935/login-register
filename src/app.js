const express =require('express');
const path=require('path');
const hbs=require("hbs");
const app=express();
require("./db/conn");
const Register=require('./models/registers');
const port=process.env.PORT || 3000;

//deploying backend

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path)
hbs.registerPartials(partial_path)
//console.log(path.join(__dirname,""));

app.get('/',(req,res)=>{
    res.render("index")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get('/index',(req,res)=>{
    res.render("index")
})

app.get('/login',(req,res)=>{
    res.render("login")
})
//creating  a new user
app.post("/register",async (req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password===cpassword){
            const registerEmployee=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword

            })
            const registered=await registerEmployee.save();
            
            res.render("login");
        }else{
            res.send("password are not matching")
        }
        //console.log(studentDetail)
        // res.send(req.body.firstname)
    }
    catch(error){
        res.status(400).send(error);
    }
})

//login check
var studentDetail;
app.post("/login",async (req,res)=>{
   try{
    const email=req.body.email;
    const password=req.body.password;
//    console.log(`${email} has password ${password}`)
  const useremail=await Register.findOne({email:email})
  studentDetail=useremail;
  //res.send(useremail);
//   console.log(username);

if(useremail.password===password){

// const detail1=`

   // res.send(studentDetail);
   res.status(201).send(`Hello ${studentDetail.firstname},Welcome to our team.You are ${studentDetail.age} year old and your contact number is ${studentDetail.phone}`);
   module.exports=studentDetail;
}else{
    res.send("password not matching")
}

    
   }catch(error){
    res.status(400).send("invalid mail")
   }
})

//for detail  page
// let firstname=document.getElementById('firstname')
// firstname.textContent=studentDetail.firstname;
// console.log(studentDetail.firstname)

const bcrypt=require('bcryptjs')
const securePassword=async (password)=>{
const pHash =await bcrypt.hash(password,10)
console.log(pHash)

const pMatch =await bcrypt.compare(password,pHash)
console.log(pMatch)
//$2a$10$Arna0lB/xm.EfNDTLqmup.kIo2yqehEF6VGXaAPFLpRbmqy32ef4W
}


securePassword("thapa@123")





app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});


// export default studentDetail;
module.exports=studentDetail;
