const User = require('../Models/User'); // Make sure this path matches your structure
const bcrypt = require('bcryptjs');

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
    res.status(200).json({ token });


    //=========================================================

    //res.json({message :'Welcome'}); // for testing by a message
  } catch (error) {
    res.status(500).send(error.message);
  }
};
