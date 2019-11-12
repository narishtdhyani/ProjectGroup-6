'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var Sequelize = require("sequelize");
const Op = Sequelize.Op

const userModel = require('../model/User');

router.use(cors());

process.env.SECRET_KEY = 'secret';
const jwtExpiryInSeconds = 600000

//Registration
exports.register = (req, res) => {
    try{
     
                const userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    type_of_user : req.body.type_of_user,
                    d_o_b : req.body.d_o_b,
                    address : req.body.address,
                    company : req.body.company,
                    orgn_type : req.body.orgn_type,
                }
            
                userModel.findOne({
                    where: {
                    email: req.body.email
                    }
                })
                .then(user => {
                    if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash
                        userModel.create(userData)
                        .then(user => {
                            return res.send({ error: false,message:"Congrats, you are successfully registered !!, Sign in to continue..." })
                        })
                        .catch(err => {
                            //res.end('error: ' + err)
                            return res.status(500).send({ error: true,message:err });
                        })
                    })
                    } else {
                    return res.status(400).send({ error: true,message:"Email Id already exists..." });
                    }
                })
                .catch(err => {
                    return res.status(500).send({ error: true,message:err })
                })
                
        

    }catch(e){
        return res.status(500).send({ error: true,message:e.message});
    }
};

exports.login = (req,res)=>{
    try{
    //console.log(req.body);
    userModel.findOne({
        where: {
          email: req.body.email
        }
      })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                
                let jwtPayload = {id:user.dataValues.id,first_name:user.dataValues.first_name,last_name:user.dataValues.last_name,type_of_user:user.dataValues.type_of_user}
                let token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
                    expiresIn: jwtExpiryInSeconds
                })

              // setting the token in the cookie with a same maximum age as that of the token
              // in cookie the max age is in milliseconds, so we have to multiply it by 1000
              //res.cookie('token', token, { maxAge: jwtExpiryInSeconds * 100000, httpOnly: false, path : '/'});
              res.cookie('token', token, { maxAge: jwtExpiryInSeconds * 100000});
              //res.setHeader(200, {'Content-Type': 'application/json'});
              //res.end(JSON.stringify({error:false,message:"Successfully Logged In..."}));
              res.send({error:false,message:"Successfully Logged In...",token:token});
            }
            else{
                return res.status(401).send({ error:true,message:'Incorrect Username or password...' });
            }
          } else {
             return res.status(401).send({ error:true,message:'User does not exist' });
          }
        })
        .catch(err => {
          return res.status(401).send({ error:true,message: err.message});
        });
    }catch(e)
    {   console.log("Error abc :",e);
        return res.status(401).send({error:true,message:e.message});
    }   
}

exports.getUserProfile = (req,res)=>{
    
        userModel.findOne({
            where: {
              id: req.payLoad.id,
              type_of_user : 'user'
            }
          })
          .then(user => {
            if (user) {
                    const userDetails ={
                                        first_name:user.dataValues.first_name,
                                        last_name:user.dataValues.last_name,
                                        email:user.dataValues.email,
                                        phone_num:user.dataValues.phone_num,
                                        profile_img_file_name:user.dataValues.profile_img_file_name,
                                        address : user.dataValues.address,
                                        d_o_b   : user.dataValues.d_o_b
                                       };
                    
                    res.status(200).json({error:false,message:"User Profile Details...",userDetails:userDetails});

            } else {
               return res.status(400).json({ error:true,message:'User does not exist' });
            }
          })
          .catch(err => {
            return res.status(401).json({ error:true,message: err.message});
          });

}

//Edit User Profile Details
exports.editUserProfile = (req,res)=>{
    console.log("hello...",req.body);
    req.body.type_of_user = req.payLoad.type_of_user;

    
                const userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_num : req.body.phone_num,
                    profile_img_file_name : req.body.profile_img_file_name,
                    address : user.dataValues.address
                }
        
            userModel.count({
                where: {
                id: req.payLoad.id,
                type_of_user : 'user'
                }
            })
            .then(c => {
                if (c) {
                            userModel.update(userData, 
                                             {
                                              where: { id: req.payLoad.id } 
                                             })  
                                            .then(updatedProfile => {
                                            
                                                return res.status(200).json({error:false,message:"Data Successfully Updated..."});
                                            
                                            })
                                            .catch(err=>{
                                                //console.log("Error is ",err);
                                                return res.status(500).json({ error:true,message:err.message});     
                                            });
                         
                } else {          
                  return res.status(400).json({ error:true,message:'User does not exist' });
                }
            })
            .catch(err => {
                return res.status(400).json({ error:true,message: err.message});
            });
          

}



exports.getEmployerProfile = (req,res)=>{
          
        userModel.findOne({
            where: {
              id: req.payLoad.id,
              type_of_user : 'owner'
            }
          })
          .then(user => {
            if (user) {
                    const userDetails = {
                                         first_name : user.dataValues.first_name,
                                         last_name  : user.dataValues.last_name,
                                         email      : user.dataValues.email,
                                         phone_num  : user.dataValues.phone_num,
                                         profile_img_file_name : user.dataValues.profile_img_file_name,
                                         address:user.dataValues.address,
                                         company : user.dataValues.company,
                                         orgn_type: user.dataValues.orgn_type
                                        };

                    res.send({error:false,message:"User Profile Details...",userDetails:userDetails});

            } else {
               return res.send({ error:true,message:'User does not exist' });
            }
          })
          .catch(err => {
            return res.send({ error:true,message: err.message});
          });

}

//Edit Employer Profile Details
exports.editEmployerProfile = (req,res)=>{
    
    req.body.type_of_user = req.payLoad.type_of_user;

                const userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_num : req.body.phone_num,
                    address:user.dataValues.address,
                    company : user.dataValues.company,
                    orgn_type: user.dataValues.orgn_type
                  }
            userModel.count({
                where: {
                id: req.payLoad.id,
                type_of_user : 'owner'
                }
            })
            .then(c => {
                if (c) {
                            userModel.update(userData, 
                                             {
                                              where: { id: req.payLoad.id } 
                                             })  
                                            .then(updatedProfile => {
                                            
                                                return res.send({error:false,message:"Data Successfully Updated..."});
                                            
                                            })
                                            .catch(err=>{
                                                //console.log("Error is ",err);
                                                return res.send({ error:true,message:err.message});     
                                            });
                         
                } else {          
                  return res.send({ error:true,message:'User does not exist' });
                }
            })
            .catch(err => {
                return res.send({ error:true,message: err.message});
            });
          
}
