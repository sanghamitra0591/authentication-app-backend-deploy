const jwt= require("jsonwebtoken");

const validator= (req, res, next)=>{
    let token= req.headers.authorization;
    if(token){
        const decode= jwt.verify(token, 'token');
        if(decode){
            const userId= decode.userId;
            req.body.userId= userId;
            next();
        }else{
            res.send("Please login first")
        }
    }else{
        res.send("Please login first")
    }
}


module.exports= {
    validator
}