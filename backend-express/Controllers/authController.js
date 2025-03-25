const User = require('../Models/User'); // Make sure this path matches your structure
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/emailUtility');
const randomstring = require('randomstring');



exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await  bcrypt.hash(password,10);

    const newUser = new User({
      username,
      email,
      passwordHash
    });
    
    console.log("newUser :", newUser);

    await newUser.save();
    res.status(201).json({message :'User registered successfully'} );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
console.log(email);
console.log(password);
console.log(user);
    if (!user) {
      return res.status(404).json({message :'User not found'});
    }
 
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({message: 'Password mismatch'});
    }

    //JWT token logic==========================================================

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: user._id }, 'JWT_SECRET_KEY_DOTENV', { expiresIn: '1h' });
    const userId = user._id;
    res.status(200).json({ token,userId});


    //=========================================================

    //res.json({message :'Welcome'}); // for testing by a message
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//=============================================================
  exports.reset_password_token = async (req, res) => {
    console.log('Reset password token route hit');
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({message :'User not found'});
    }
  
    const resetToken = randomstring.generate();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 36000000; // 10minutes
    await user.save();
  
    const resetUrl = `http://localhost:4200/#/set_new_password/${resetToken}`;
    const message = `Please use the following link to reset your password: ${resetUrl}`;
  try{
    await sendEmail(user.email, 'Password Reset', message);
    res.json({message : 'Reset password link has been sent to your email.'});
  }catch (error) {
    res.status(500).send(error.message);}
  };


exports.reset_password = async (req, res) => {
  //console.log('Reset password with token route hit');
  const { token } = req.params;
  const { newPassword } = req.body; // Ensure the new password is passed in the request body

  try {
      // Find the user with the matching reset password token and token expiration date
      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }  
      });

      if (!user) {
          return res.status(401).json({ message: "Password reset token is invalid or has expired." });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user with the new hashed password and clear the reset token fields
      user.passwordHash = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save the updated user information
      await user.save();

      // Send a success response
      res.json({ message: "Your password has been updated successfully." });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


