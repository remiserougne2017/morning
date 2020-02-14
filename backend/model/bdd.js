var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://admin:YR86xbcQQWslqNwK@cluster0-vosmv.mongodb.net/test?retryWrites=true&w=majority',
    options,
    function(err) {
        console.log(err);
    }
);

module.exports = mongoose;