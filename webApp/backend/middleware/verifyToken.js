'use strict';
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';
const jwtExpiryInSeconds = 600

exports.verifyToken =(req,res,next)=>{
  //console.log("Request--->",req.body);
    const token = req.cookies.token;
    //console.log("token",token);

    if (!token) {
        return res.status(401).send({error:true,message:"Unauthorised Access (Token NA)..."});
    }

    var payLoad;
        try {
              payLoad = jwt.verify(token, process.env.SECRET_KEY);
        } catch (e) {
          if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).send({error:true,message:"Unauthorised Access ..."});
          }
          // otherwise, return a bad request error
          return res.status(400).send({error:true,message:"Bad Request..."})
        }

        req.payLoad = payLoad;
        next();

}

