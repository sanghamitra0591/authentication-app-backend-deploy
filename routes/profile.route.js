const express= require("express");
const { UserModel } = require("../models/user.model");

const profileRouter= express.Router();


profileRouter.get("/getProfile", async(req, res)=>{
    const userId= req.body.userId;
    try {
        const data= await UserModel.find({_id:userId});
        if(data.length>0){
            res.send(data);
        }else{
            console.log({"error":error});
            res.send("Unable to fetch profile data");
        }
    } catch (error) {
        console.log({"error":error});
        res.send("Unable to fetch profile data");
    }
})

profileRouter.patch("/editProfile", async(req, res)=>{
    const userId= req.body.userId;
    const data= req.body;
    try {
        await UserModel.findByIdAndUpdate({_id:userId}, data);
        res.send(`Updated user profile`);
    } catch (error) {
        console.log({"error":error});
        res.send("Unable to edit profile data");
    }
})



module.exports= {
    profileRouter
}