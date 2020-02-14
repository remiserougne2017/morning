var mongoose = require('./bdd');

const wishlistSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    url : String,
    language : String
})

//schema mongoDB
var userSchema = mongoose.Schema({
    email: String,
    pwd:String,
    salt:String,
    token:String,
    wishList: wishlistSchema
});

//article
var userModel = mongoose.model('users', userSchema);

module.exports = userModel;