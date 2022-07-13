const User = require('../models/User');

exports.getUsers = async (req,res) => {
 try{
  const users = await User.find({});
  return res.status(200).json({ok: true, users});
 }catch(error){
  console.log(error);
  res.status(500).json({ok:false, message: error.message});
 }
} 

exports.createUser = async ( req, res ) => {
try{
  const user= new User({...req.body});
  const savedUser = await user.save();
  return res.status(201).json({message: "user was saved", user: savedUser});
}catch(error){
  console.log(error);
  res.status(500).json({message: error.message});
}
}
// este metodo no es necesario 
exports.updateUser = async ( req, res) =>{
  // const { id } = req.params;
  const id = req.user._id;
  let updateUser
  try{

    const user = await User.findById(id);
    if(!user) return res.status(404).json({ok:false, message: "User not Found"});
    
    const newBody = {
            name:req.body.name, 
            surname:req.body.surname, 
            email:req.body.email} 
    if(req.user.role==="client" || req.user.role===user.role){
       console.log("Usted no puede manipular el Role");
       updateUser = await User.findByIdAndUpdate(id,newBody, {new:true});
    }else{
      updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});
    }
    return res.status(200).json({ok:true, publication: updateUser});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
};

exports.deleteUser = async ( req, res ) =>{
  try{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ok:true, msg:"Removed user Successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({message:'The server failed'});
  }
};

exports.getUserById = async( req, res) => {
  try{
    const { id } = req.params;
    console.log(id);
    const user= await User.findById(id);
    if(!user) return res.status(404).json({ok: false , message: 'User not Found'}); 
    return res.status(200).json({ok: true, user});

  }catch(error){
    console.log(error);
    res.status(500).json({message:'The server failed'});
  }
}

exports.getUserByToken= async(req, res)=>{
  try{
    const {name,surname, email}= req.user;
    return res.status(200).json({user:{
      name,
      surname,
      email
    }
  });
  }catch(error){
    console.log(error);
    return res.status(500).json({message:'The server failed'});
  }
}