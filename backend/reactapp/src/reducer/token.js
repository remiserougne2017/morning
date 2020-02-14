export default function(token = "", action) {

    if(action.type == 'addToken') {
        console.log("reducer",action)
    var myToken = action.token
    return myToken
  }else{
      return token
  }
}