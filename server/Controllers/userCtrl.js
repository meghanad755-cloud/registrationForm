const userModel = require("../Model/user");
const bcrypt = require('bcryptjs')



const Register = async (req,res) =>{//async:it tell javascript that this function is asynchronous code which will handle multiple task at a time.

    const {firstName , lastName, email, password, confirmPassword}= req.body;

   

    //checks password and confirmPassword matches
    if(password !== confirmPassword){
        return res.status(400).json({ message: "passworss do not match!"})
    }

    //check email already exists
    //await : it tells javascript to wait untill that operation completes.
    try {
    const emailExists = await userModel.findOne({email})
    if(emailExists){
        return res.status(400).json({ message:"email already exists"})
    }

    // hashing the password using salt
    //what is salt?
    //A salt is a random piece of data added to a password before its hashed.
    //prevents identical hashes: without salt, if two users have the same password(e.g., "password123"),thier hashed passwords would also be the same.
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    // adding our data into database
    const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password:hashedpassword
    })
    res.status(200).json({ message:'user registered successfully' , data: newUser})

     } catch (error) {
        res.status(500).json({ message: "server error"})
    }
}

const Login = async(req,res) => {
    const {email, password} = req.body;
 
    try {
        //checks whether email registered or not 
        const userExists = await userModel.findOne({ email})
        if(!userExists){
            res.status(400).json({ message:"invalid Email" })
        }

        //checks whether password and saved hashed password matches or not
        const isPasswordMatch =await bcrypt.compare(password,userExists.password)
        if(!isPasswordMatch){
            res.status(400).json({ message:"Invalid Password"})
        }
// if it is matching
res.status(200).json({ message:"loggedIn successfully"})
    } catch (error) {
        res.status(500).json({ message:"server error"})
    }
}

module.exports = {
    Register,
    Login
}