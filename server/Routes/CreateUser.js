const express = require("express");
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');

//for password Hashing
const bcrypt=require("bcryptjs");

//for auth token
const jwt=require("jsonwebtoken");
const jwtSecret="SHIVANSHYahaKuchBhiLikhLoBassBadaHoJisseSecureRhe"

router.post("/createuser",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        try {
            //code of validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //code for password hashing
            let salt= bcrypt.genSaltSync(10);
            let secPassword= bcrypt.hashSync(req.body.password,salt);

            await User.create({
                name: req.body.name,
                password:secPassword,
                email: req.body.email,
                location: req.body.location
            })
            
            res.json({ success: true })
        } catch (err) {
           
            res.json({ success: false })
        }
    })

router.post("/loginuser", body('email').isEmail(),
    body('password').isLength({ min: 5 }), async (req, res) => {
        let email = req.body.email
        try {//code of validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email" });
            }

           
                
            //to compare hashed password
            const pwdCompare=bcrypt.compareSync(req.body.password,userData.password); //returns true or false
            if(!pwdCompare){
                return res.status(400).json({ errors: "Incorrect Password" });
            }

          
            const payloadData={
                user:{
                    id:userData.id
                }
            }
const authToken=jwt.sign(payloadData,jwtSecret);
            return res.json({ success: true,authToken:authToken })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })
module.exports = router;