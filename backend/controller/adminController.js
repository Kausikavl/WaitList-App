const User = require('../model/User')
const Room = require('../model/Room')
const admin = require('../model/admin')
const signJswtToken = require('../config/jwt');
const { userInfo } = require('./userController');
const { param } = require('../routes');

const adminLogin = async (req, res) => {
    const { email, password } = req.body.user;
    console.log(req.body.user);
    if (!email || !password) {
      return res.status(300).json({ message: "fill all fields" });
    }
    try {
      const existingAdam = await admin.findOne({ username: email });
      if (!existingAdam) {
        return res
        .status(404)
        .json({ message: "Admin is not valid" });
      }
      else {
        if (password != existingAdam.password) {
          return res.status(504).json({ message: "password or email incorrect" });
        }
        
        let ad = existingAdam.toJSON(); 
        let token = signJswtToken(ad);
        res.send({ message: "Logged in", token: token });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
};

const getall = async(req, res) => {
  const rooms = await Room.find();

  // Fetch all users
  const users = await User.find();

  // Create a mapping from userId to user object for quick lookup
  const userMap = {};
  users.forEach(user => {
    userMap[user._id.toString()] = user;
  });

  // Combine position from roomusers with name and email from fulluser
  const combinedArray = rooms.map(room => {
    return room.users.map(roomuser => {
      const user = userMap[roomuser.user];
      if (user) {
        return {
          position: roomuser.position,
          name: user.name,
          email: user.email
        };
      } else {
        return {
          position: null,
          name: null,
          email: null

        };
      }
    });
  });
  res.send(combinedArray)
    
}
const update = async(req,res)=>{
  // console.log(req);
  const {id} = req.params;
  const {name,email} = req.body;
 try{
  const data = await User.findOneAndUpdate({email:id},
    {$set:{
      name:name,
      email:email
    }}
  )
  res.status(200).json({message:"Data is updated successfully"})
 }
 catch(err){
  res.status(201).json({message:"the data is not updated"})
 }


}


const deleteDetail = async(req,res)=>{
  const {id}=req.params;
  console.log(id);
  try{
    const whole_data=await User.findOne({email:id})
    console.log(whole_data);
    await User.findOneAndDelete({
      email:id
    })
    // await Room.findOneAndDelete({
    //   users.user:whole_data._id
    // })
    res.status(200).json({message:"Succefully deleted"})
  }
  catch(err){
    res.status(400).json({message:err})
  }

}
module.exports = {adminLogin,getall,update,deleteDetail}
  