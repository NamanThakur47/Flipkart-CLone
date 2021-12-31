import User from "../model/userSchema.js";

export const userSignup = async (request,response) =>{
    try{
        const exist = await User.findOne({username:request.body.username});
        if(exist){
            return response.status(401).json('Username Already Exist');
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json('User Is Successfully Registered');

    }catch(error){
        console.log('Error :',error.message);
    }
}


export const userLoginIn = async(request,response) =>{
    try{
        let user = await User.findOne({username:request.body.username,password: request.body.password});
        if(user){
            return response.status(200).json(`${request.body.username} Login Successfull `);
        }else{
            return response.status(401).json('Invalid Login Or Password');
        }
    }catch (error){
        console.log('Error :', error.message);
    }
}