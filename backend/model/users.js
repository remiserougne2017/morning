var mongoose = require('./bdd');

//schema mongoDB
var userSchema = mongoose.Schema({
    email: String,
    pwd:String,
    salt:String,
    token:String
});

//article
var userModel = mongoose.model('users', userSchema);

module.exports = userModel;