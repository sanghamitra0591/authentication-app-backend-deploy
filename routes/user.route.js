const express= require("express");

const userRouter= express.Router();

const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const { UserModel } = require("../models/user.model");


userRouter.post("/register", async(req, res)=>{
    const data= req.body;
    data.profilePicture= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrIN_phrkQozJkBJi9v7jqOEazcPIad5SYA&usqp=CAU"
    try {
        if(data.email!=="" && data.password!==""){
            bcrypt.hash(data.password, 3, async(err, hashed)=>{
                if(err){
                    console.log({"error":err});
                    res.send("Unable to register user");
                }else{
                    const newUser= new UserModel({...data, password:hashed});
                    await newUser.save();
                    res.send({"msg":"Registered"});
                }
            })
        }else{
            console.log({"error":error});
            res.send({"msg":"Please fill the details"});
        }
    } catch (error) {
        console.log({"error":error});
        res.send("Unable to register user");
    }
})

userRouter.post("/login", async(req, res)=>{
    const data= req.body;
    try {
        let isAvailable= await UserModel.find({email:data.email});
        if(isAvailable.length>0){
            bcrypt.compare(data.password, isAvailable[0].password, (err, ans)=>{
                if(ans){
                    const token= jwt.sign({userId: isAvailable[0]._id}, 'token');
                    res.send({"msg": "Login Successful", "token":token})
                }else{
                    res.send("Wrong Password");
                }
            })
        }else{
            res.send("No User Found")
        }
    } catch (error) {
        console.log({"error":error});
        res.send("Unable to login user");
    }
})



module.exports= {
    userRouter
}