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

  // Backs the "female-only staff" filter customers can search on and the
  // enforcement check at booking time (see Booking.preferredStaffGender).
  gender: { type: String, enum: ["male", "female"] },

  description:String,
  hourlyRate:Number,
  availability:String,

  serviceRadius:Number,

  tags:[String],

  profileImage:String,

  documents:{
    idDocument:String,
    licenseDocument:String,
    insuranceDocument:String,
    // Domestic-help / live-in staff categories (maids, nannies, caregivers) need
    // sponsor-visa paperwork on top of the standard verification documents —
    // see the compliance fields below.
    visaDocument:String,
    sponsorshipDocument:String
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

  // Sponsorship/visa compliance review — only meaningful for domestic-help
  // categories (see isDomesticHelpCategory in provider-service.js). Kept
  // separate from `status` because a provider can be approved to work while
  // their sponsorship paperwork is still pending review.
  complianceStatus: {
    type: String,
    enum: ["not_applicable", "pending", "verified", "rejected"],
    default: "not_applicable",
  },
  complianceNotes: { type: String, default: "" },
  complianceReviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  complianceReviewedAt: { type: Date },

  // Stripe Connect payout
  stripeAccountId:     { type: String, default: "" },
  stripeAccountStatus: { type: String, enum: ["none","pending","active"], default: "none" },
},
{timestamps:true}
);

module.exports = mongoose.model("ProviderApplication",providerApplicationSchema);