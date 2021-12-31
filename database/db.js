import mongoose from "mongoose";

const Connection = async (URL) =>{
    try
    {
        await mongoose.connect(URL || 'mongodb://localhost/NamanPal'
        ,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log('Database Connected SuccessFully');
    } 
    catch(error)
    {
        console.log('Error: ',error.message);
    }
}

export default Connection;
