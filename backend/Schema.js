const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/////////////////user///////////////////////////////
const userSchema = mongoose.Schema({
  name: { type: String, required: 'Name is require' },
  email: { 
  type: String, 
  required: 'Email is require',
  unique: true,
  lowercase: true,
  trim: true },

  password: { type: String, required: 'Password is require' },
  userType: { type: String, required: 'UserType is require' },
},
{
  timestamps: true,
});

 userSchema.pre("save", async function (next) {
   try {
     if (!this.isModified("password")) {
       return next();
     }
     const hashedPassword = await bcrypt.hash(this.password, 10);
     this.password = hashedPassword;
     next();
   } catch (error) {
     return next(error);
   }
 });

const UserSchema = mongoose.model("user_Schema", userSchema);

///////////////complaint///////////////////
const complaintSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  name: {type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true }, 
  comment: { type: String, required: true },
  status: { type: String, required: true },
});

const ComplaintSchema = mongoose.model("complaint_schema", complaintSchema)

///////////assigned complaint schema////////////////////////
const assignedComplaint = mongoose.Schema({
  agentId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  complaintId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "complaint_schema" },
  status: {type: String, required: true },
  agentName: {type: String, required: true },
})

const AssignedComplaint = mongoose.model("assigned_complaint",assignedComplaint)

////////////////////chatWindow schema/////////////////////////
const messageSchema = new mongoose.Schema({
  name: {type: String, required: 'name is required'},
  message: {type: String, required: 'message is required'},
  complaintId: {type: mongoose.Schema.Types.ObjectId, ref: "assigned_complaint"}
}, { timestamps: true });

const MessageSchema = mongoose.model('message', messageSchema);

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

const Otp = mongoose.model("Otp", OtpSchema);

module.exports.Otp = Otp;

module.exports = {
  UserSchema,
  ComplaintSchema,
  AssignedComplaint,
  MessageSchema,
  Otp
};


