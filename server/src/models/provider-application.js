const mongoose = require("mongoose");

const providerApplicationSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  firstName:String,
  lastName:String,

  email:String,
  phone:String,

  address:String,
  city:String,
  state:String,
  zipCode:String,

  serviceCategory:String,
  yearsExperience:Number,
  businessName:String,

  description:String,
  hourlyRate:Number,
  availability:String,

  serviceRadius:Number,

  tags:[String],

  profileImage:String,

  documents:{
    idDocument:String,
    licenseDocument:String,
    insuranceDocument:String
  },

  status:{
    type:String,
    enum:["pending","approved","rejected"],
    default:"pending"
  },

  reviewedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  penaltyCount: { type: Number, default: 0 },

  // Stripe Connect payout
  stripeAccountId:     { type: String, default: "" },
  stripeAccountStatus: { type: String, enum: ["none","pending","active"], default: "none" },
},
{timestamps:true}
);

module.exports = mongoose.model("ProviderApplication",providerApplicationSchema);