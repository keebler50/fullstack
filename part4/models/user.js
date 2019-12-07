const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', userSchema)
