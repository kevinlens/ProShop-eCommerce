import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
//Powerful ToolKit to Validate
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      required: [true, 'Please provide a password'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//before save do...
//e.g: User.create() is the syntactic sugar for the .save() method
userSchema.pre('save', async function (next) {
  /*If password is not modified(empty password string or not updated) then call next() middleware, else if it is
  modified(meaning a newly created document, with users password, or updated) 
  then encrypt the new password*/
  if (!this.isModified('password')) {
    next();
  }
  //for hashing new accounts password
  const salt = await bcrypt.genSalt(10);
  //the hash the current, newly created user
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
