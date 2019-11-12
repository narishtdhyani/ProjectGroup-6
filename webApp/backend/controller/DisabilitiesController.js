'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var Sequelize = require("sequelize");
const Op = Sequelize.Op

const userDisabilityModel = require('../model/UserDisability');


router.use(cors());


//Add Disabilities
exports.add = (req, res) => {
    try{
     
                req.body.user_id = req.payLoad.id;            
                userDisabilityModel.create(req.body)
                        .then(result => {

                          userDisabilityModel.findAll({
                                                        where : {
                                                                user_id: req.payLoad.id
                                                                }
                                                          })
                                                          .then(result =>{

                                                            return res.send({ error: false,message:"Disability Successfully Added",result:result })
                                                          
                                                          })
                                                          .catch(err => {
                                                            //res.end('error: ' + err)
                                                            return res.status(500).send({ error: true,message:err });
                                                        });
                        })
                        .catch(err => {
                            //res.end('error: ' + err)
                            return res.status(500).send({ error: true,message:err });
                        });
                    
    }catch(e){
        return res.status(500).send({ error: true,message:e.message});
    }
};



exports.getMyDisability = (req,res)=>{
    
      userDisabilityModel.findOne({
            where: {
              id     : req.params.id,  
              user_id: req.payLoad.id
            }
          })
          .then(result => {
            if (result) {
                    
                    res.status(200).json({error:false,message:"Disability...",result:result});

            } else {
               return res.status(400).json({ error:true,message:'Disability Not Available...' });
            }
          })
          .catch(err => {
            return res.status(500).json({ error:true,message: err.message});
          });

}

//Edit User Profile Details
exports.edit = (req,res)=>{
        
    userDisabilityModel.count({
                where: {
                id : req.params.id,  
                user_id: req.payLoad.id
                }
            })
            .then(c => {
                if (c) {
                          userDisabilityModel.update(req.body, 
                                             {
                                              where: { id: req.params.id } 
                                             })  
                                            .then(result => {
                                            
                                                return res.status(200).json({error:false,message:"Data Successfully Updated..."});
                                            
                                            })
                                            .catch(err=>{
                                                
                                                return res.status(500).json({ error:true,message:err.message});     
                                            });
                         
                } else {          
                  return res.status(400).json({ error:true,message:'Disability Not Available...' });
                }
            })
            .catch(err => {
                return res.status(500).json({ error:true,message: err.message});
            });
          

}

exports.getMyAllDisabilities = (req, res) => {
  
              userDisabilityModel.findAll({
                                            where : {
                                                    user_id: req.payLoad.id
                                                    }
                                              })
                                              .then(result =>{

                                                return res.send({ error: false,message:"Disabilities...",result:result })
                                              
                                              })
                                              .catch(err => {
                                                //res.end('error: ' + err)
                                                return res.status(500).send({ error: true,message:err });
                                            });
      
}



