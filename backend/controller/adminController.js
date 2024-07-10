const user = require('../model/User')
const room = require('../model/Room')
const admin = require('../model/admin')
const signJswtToken = require('../config/jwt')

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
    
}

module.exports = {adminLogin}
  