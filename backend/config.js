const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://myAtlasDBUser:Bala123@myatlasclusteredu.glscbwd.mongodb.net/details?appName=myAtlasClusterEDU")
.then(()=>{
   console.log("connected to mongodb atlas")
})
.catch((err)=>{
   console.log(err)
})
