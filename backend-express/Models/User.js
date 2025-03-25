const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// // Password hashing middleware. **ensures that its alays hashed no matter the file locations**
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('passwordHash')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// // Instance method to check password.
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.passwordHash);
// };

// Create the model from the schema.
const User = mongoose.model('User', userSchema);

module.exports = User;
