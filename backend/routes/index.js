var express = require('express');
var router = express.Router();
var userModel = require('../model/users')
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");

//POST ajout articlle BDD
router.Pos


/* POST signUP home page. */
router.post('/sign-up', async function(req, res, next) {

 //function cryptage pwd et enregistrement user
  const hashPassword = async (pwd) => { 
    var salt = uid2(32);
    var token=uid2(32)
    
    return {token,salt}
  }
  
  console.log("sign-up")
  var login = false;
  var token=""
  var message="";
  var userSearch = await userModel.findOne({"email": req.body.email})
  console.log("search user",userSearch)

  if(req.body.email=="" || req.body.pwd==""){
     message="Les champs sont obligatoires"
      }else if( userSearch == null){      
   var crypt = await hashPassword(req.body.pwd)  
   console.log(crypt)
    var newUser = new userModel({
      email: req.body.email,
      pwd:  SHA256(req.body.pwd + crypt.salt).toString(encBase64),
      salt: crypt.salt,
      token: crypt.token
    });
    login=true
    var userSave = await newUser.save();
    message="ok"
    console.log("oK",userSave)
  }else{
    message=`l'email ${req.body.email} existe déjà`
  }
res.json({ message, login, token});
});

/* GET signIn home page. */
router.post('/sign-in', async function(req, res, next) {
  console.log(req.body)
  var login =false
  var message=""
  var userSearch = await userModel.findOne({
    "email": req.body.email
  });

  console.log("Hello sign-in",userSearch)
 if(userSearch==null){
  message="Email inconnu"
  login =false
  console.log("sign-in if 1",message)
  res.json({message,login});
 }else{
    var hash = SHA256(req.body.pwd + userSearch.salt).toString(encBase64);
    console.log("Hash",hash, userSearch.pwd)
    if (hash === userSearch.pwd) {
     message="ok"
    login =true
    res.json({message,login,token:userSearch.token});
   }else{
  console.log("sign-in else final");
   message="Le mot de passe est faux";
  res.json({message,login});
 }
  
}

});

///// route add Bdd

router.post('/addArticleBdd', async function (req, res, next){
  var user = await userModel.findOne({"token": req.body.token})
  console.log(user)

  var addArticle = 
      user.wishlist.push({"id": req.body.id,
  "name": req.body.title,
  "description": req.body.desc,
  "url": req.body.img,
  "language": req.body.lang
})
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", addArticle)
}
  
  ///var updateUser = await user.updateOne
)

module.exports = router;
