// const Admin = require('./model/admin')
// const {} = require('./model/User')
// const mongoose = require('mongoose')


// mongoose.connect('mongodb://localhost:27017/room')
// .then(()=>{
//     return createAdmin()
// })
// .then(()=>{
//     mongoose.disconnect()
//     console.log('false')
// })
// .catch(err =>{
//     console.log(err)
// })

// createAdmin();
// const createAdmin = async () => {
//     const newAdmin = new Admin({
//         username: 'admin',
//         password: 'adminpassword'
//     });
    
//     await newAdmin.save();
//     console.log('Admin created successfully');

// };