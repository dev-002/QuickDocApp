const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = {
  name: String,
  relationship: String,
  contact: Number,
};

const userSchema = new Schema({
  _id: crypto.randomUUID(),
  role: {
    type: Number,
    default: 2,
    // 0-admin 1-doctor 2-patient
    required: true,
  },
  avatar: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length >= 10;
      },
      message: (props) =>
        `${props.value} is not a valid mobile number! It must be at least 10 digits long.`,
    },
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: Number,
    // 0-male 1-female
    required: true,
  },
  address: {
    type: String,
  },
  medicalHistory: {
    existing: [{ type: String }],
    allergies: [{ type: String }],
    medications: [{ type: String }],
  },
  emergencyContacts: [{ type: contactSchema }],
});

userSchema.pre("save", () => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("Error Generating salt", err);
      return;
    }
    bcrypt.hash(this.password, salt, async (err, hash) => {
      if (err) {
        console.log("Error Creating hashed pass", err);
        return;
      }
      this.password = hash;
      this.save();
    });
  });
});

module.exports = mongoose.model("user", userSchema);
