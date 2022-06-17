const {Schema} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema= new Schema({
 name:{
  type: String,
  require: [true, 'you must enter a name'],
  minlength:5,
  maxlength:30
 },
 surname:{
  type: String,
  require:[true, 'you must enter a surname'],
  minlength:5,
  maxlength:30
 },
 email:{
  type: String,
  lowercase:true,
  unique: true,
  minlength:4,
  maxlength:30,
  validate: [validator.isEmail, 'Please, enter a correct email']
 },
 password:{
  type: String,
  require: [true, 'The password is required'],
  select: false, 
  minlength:8,
  maxlength:30,
 },
 passwordConfirm:{
  type: String,
  required: [true, 'Confirm your password'],
  validate: {
    validator: function(value){
      return value === this.password;
    }
  }
 },
 role:{
  type: String,
  enum:{
    values: ['user', 'admin'],
    message:"The entered value is incorrect"
  },
  default:'user'
 }
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});


const User = model('User',userSchema);
module.exports = User;