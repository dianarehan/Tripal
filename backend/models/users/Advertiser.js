const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertiserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    hotline: {
      type: String,
      required: false,
    },
    companyProfile: {
      logo: {
        type: String,
        required: false,
        default: "",
      },
      companyName: {
        type: String,
        required: false,
      },
      industry: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      foundedYear: {
        type: Number,
        required: false,
      },
      employees: {
        type: Number,
        required: false,
      },
      headquarters: {
        address: {
          type: String,
          required: false,
          default: "",
        },
        city: {
          type: String,
          required: false,
          default: "",
        },
        country: {
          type: String,
          required: false,
          default: "",
        },
      },
      socialMedia: {
        linkedin: {
          type: String,
          required: false,
          default: "",
        },
        twitter: {
          type: String,
          required: false,
          default: "",
        },
      },
      certifications: {
        type: [String],
        required: false,
      },
      awards: [
        {
          title: {
            type: String,
            required: false,
          },
          year: {
            type: Number,
            required: false,
          },
          issuer: {
            type: String,
            required: false,
          },
        },
      ],
    },
    notificationList:[ {
      message: String,
      read: {type:Boolean , default: false} ,
      createdAt:{type:Date , default: Date.now} 
    }]
  },
  { timestamps: true }
);

const Advertiser = mongoose.model("Advertiser", advertiserSchema);
module.exports = Advertiser;