const jwt = require('jsonwebtoken');

const verifyToken = (req, resp, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (error, data)=>{
            if(error){
                resp.status(403).json({ message: "Token is not valid" });
            }else{
                req.data = data;
                next();
            }

        });
    }else {
        resp.status(401).json({ message: "You are not authenticated" });
    }
} 

const verifyTokenAndAuthorization = (req, resp, next)=>{
    verifyToken(req, resp, ()=>{
        if(req.data.id == req.params.id || req.data.isAdmin){
            next();
        }else{
            resp.status(403).json({ message: "You are not allowed to do that." });
        }
    }); 
}

const verifyTokenAndAdmin = (req, resp, next)=>{
    verifyToken(req, resp, ()=>{
        if(req.data.isAdmin){
            next();
        }else{
            resp.status(403).json({ message: "You are not allowed to do that." });
        }
    }); 
}



module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };