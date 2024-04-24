const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  role: {
    type: Number,
    required: true,
    default: 2,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return v.toString().length >= 10;
      },
      message: (props) =>
        `${props.value} is not a valid mobile number! It must be at least 10 digits long.`,
    },
    required: true,
  },
  gender: {
    type: Number,
    enum: [1, 2],
    // 1-male 2-female
    required: true,
  },
  experience: {
    type: Number,
  },
  specialization: {
    type: String,
  },
  leaveDays: {
    type: [
      {
        date: { type: Date, required: true },
        limit: { type: Number, required: true, default: 10 },
      },
    ],
    default: [],
  },
});

doctorSchema.pre("save", function (next) {
  if (this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log("Error Generating salt", err);
        return next(err);
      }

      bcrypt.hash(this.password, salt, async (err, hash) => {
        if (err) {
          console.log("Error Creating hashed pass", err);
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("doctor", doctorSchema);
