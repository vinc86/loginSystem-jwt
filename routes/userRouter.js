const router = require('express').Router()
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.get("/", async (req,res) => {
    await User
    .find()
    .then(users => res.json({users: users}))
    
})


router.get("/:id", auth , async (req,res)=>{
    const {id} = req.params;
   await User
   .findById(id)
   .then(user => res.json(user))
})


router.post("/register",async (req,res)=>{

    try {
        
        const {username,email,password,confirmPassword} = req.body;

        if(!username || !email || !password || !confirmPassword){
            return res.status(400).json({error: "All fields are required!"});
        }
        if(password.length < 5){
            return res.status(400).json({error: "The Password needs to be at least 5 characters"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({error: "Enter the same Passwords for the validation"});
        }

        const existingEmail = await User.findOne({email: email});
        const existingUser = await User.findOne({username: username});
        
        if(existingUser){
            return res
            .status(400)
            .json({error: "Username already taken"})
        }
        if(existingEmail){
            return res
            .status(400)
            .json({error: "Email already registered"})
        } 

        const newUser = new User({
            email,
            username,
            password
        });
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password, salt,(err,hash) => {
                newUser.password = hash;
                newUser
                .save()
                .then(user => res.json({
                    message: `User ${username} registered`
                }))
            })
        })
       
        
    } catch(err){
        res
        .status(500)
        .json({"error": err.message})
        console.log(err)
    }
    
})


router.post("/login",async (req,res)=>{

        const { userNameOrEmail, password } = req.body;
        if(!userNameOrEmail || !password){
            return res.status(400).json({error: "Empty fields"});
        }
        const findUser = await User.findOne({email: userNameOrEmail }) || await User.findOne({username: userNameOrEmail})
       
       if(!findUser){
        return res
        .status(400)
        .json({"error": "Ooops! Seems like you are not yet registered :( "})
        } 
        
          // compare password
      
             bcrypt
              .compare(password,findUser.password )
              .then(isMatch =>{
                 if (!isMatch){
                      return res
                      .status(400)
                      .json({error: "Invalid password"})  
                  }
                  
                  const token = jwt.sign({id: findUser._id},process.env.JWT_SECRET)
                  res.json({
                      token,
                      user:{
                          id: findUser._id,
                          email: findUser.email,
                          username: findUser.username
                      }
                  })
              })
              .catch(err => console.log(err)) 
})


router.delete("/:id",auth,async(req,res)=>{
    if(req.params.id !== req.user){
        return res.status(401).json({error: "Authorization denied"})
    }
    await User.findById(req.user)
    .then(user => user
        .remove()
        .then(user => res.json({message: `User ${user.username} deleted`}))
        )
    
})

module.exports = router;