const User = require("../models/usersmodel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const userRole = require("../utils/user-roles");
require('dotenv').config()

const getAllUsers = async (req,res)=>{
  const users = await User.find({},{"__v":false,"password":false})
        res.status(200).json(users)}


        const getSingleUser = async (req,res)=>{
            const {id} = req.params
            const user = await User.findById(id)
            if(!user) return res.status(404).json({message:"user not found"})
                res.status(200).json(user)
            }


            const createUser = async (req,res)=>{
               try{
                const {username,password,firstName,lastName,email,roles} = req.body;
                const oldUser = await User.findOne({username:username})
                if(oldUser)
                 return res.status(400).json({message:"user already exists"})


              const hashedPassword= await bcrypt.hash(password,10)
                const newUser= new User({
                        username,
                        firstName,
                        password:hashedPassword,
                        lastName,
                        email,
                        roles
                        
                    })
                    //generate jwt token
                
              const token =await generateJWT({username:username,userId:newUser._id,roles:newUser.roles})
                    newUser.token = token;

                    await newUser.save();
                    res.json({status:"success",data: newUser})
                }catch (error) {
                    console.error("Error:", error.message);
                    res.status(500).json({ message: error.message});
                  }}


                const updateUser = async(req,res)=>{
                    const {id} = req.params
                    const {username,password,firstName,lastName} = req.body;
                    const user = await User.findById(id)
                    if(!user) return res.status(404).json({message:"user not found"})
                        user.username = username
                    user.password = password
                    user.firstName = firstName
                    user.lastName = lastName
                    user.email = email
                    
                    await user.save()
                    res.status(200).json(user)

                }

                const deleteUser = async(req,res)=>{
                    try{
                        const deletedUser = await User.deleteOne({_id:req.params.userId})
                        if (!deletedUser) {
                            return  res.status(404).json({ msg: "User not found" });
                            }
                            res.json({status:"success",data: null})
                            } catch(err){res.status(400).json({ msg: "invalid user id" })}
                            }


         const login = async(req,res)=>{
            const {username,password} = req.body
            if(!username && !password){
            return res.status(400).json({message:"please provide username and password"})
            }
            const user = await User.findOne({username:username})
            if(!user) return res.status(400).json({message:"invalid credentials"})
                const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({message:"invalid credentials"})
                const token = await generateJWT({username:user.username,userId:user._id,userRole:user.roles})
            res.json({status:"success",data:{username:user.username,token:token}})
            }
                //res.json({status:"succees",msg:"logged in successfully",token :""})


            //     const token = jwt.sign({id:user._id},process.env.JWT_SECRET
            // res.json({status:"success",data:{user,token}})

            
        












            // const user = User.findOne({username:username})
            // if(!user) return res.status(400).json({message:"user not found"})
            //     const validPassword = bcrypt.compare(password,user.password)
            // if(!validPassword) return res.status(400).json({message:"invalid password"})
            //     res.json({status:"success",data: user})
            
                         
                







      
                            module.exports = {getAllUsers,getSingleUser,createUser,updateUser,deleteUser,login}