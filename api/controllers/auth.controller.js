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


//google auth

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest } = user._doc;
            res
                .cookie('access token', token, {httpOnly: true})
                .status(200)
                .json(rest);
            }
            else{
                // genrated password and we used math dot random method ,we creata a random number and then convert this number to string and based on 36 . 36 means number form 0 to 9 and also letters to a too z so this is going to be random leter and number together and also we want last eight digit
                const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
                const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
                await newUser.save();

                const token = jwt.sign({id: newUser._id }, process.env.JWT_SECRET);
                const {password: pass, ...rest } = newUser._doc;
                res.cookie('access_token' , token, { httpOnly: true}).status(200).json(rest);
        }

    }catch(error){
        next(error)
    }
}



//signout function
export const SignOut= async ( req, res, next) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!')
       
        
    }catch(error){
        next(error)
    }


}