import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

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

