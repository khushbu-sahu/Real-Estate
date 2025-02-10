import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

// here  next is a function that is useed to handle errors and it is compe from middleware
export const signup=async (req, res, next)=>{
 console.log("Request Body:", req.body); // 🔍 Debugging log

    
    // use this below code to save the data in the mongodb database
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // const newUser = new User({ username, email, password });
    const newUser = new User({ username, email,password: hashedPassword });
    try{
        await newUser.save();
        res.status(201).json('User created successfully!');

    }catch(error){
        // res.status(500).json(error.message)
        next(error);
    }  
}


export const signin=async(req, res, next)=>{
    //email and password are coming from the request body
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email })
        if(!validUser) return next(errorHandler(404, "User not found!"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong credential!'))

            const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = validUser._doc;
            res
            .cookie('access_token' , token, { httpOnly: true })
                .status(200)
                .json(rest)


    } catch(error)
{
    next(error);
}}