import React,{useState} from 'react';
import './App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom';  
import {connect} from 'react-redux';

function ScreenHome(props) {
const [email,setEmail] = useState('');
const [pwd,setPwd] = useState('');
const [emailUp,setEmailUp] = useState('');
const [pwdUp,setPwdUp] = useState('');
const [isLogin,setIsLogin] = useState(false);
const [message,setMessage] = useState("")
const [messageUp,setMessageUp] = useState("")


//Fonction Sign UP
  const signUp = async () => {
    
    var regex= /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    var res=regex.test(emailUp)
    console.log("regex",res)
    if(res==false){
      setMessageUp("Attention, email invalide...")
    }else{
      console.log("HEHE", email,pwd)
      var response = await fetch('/sign-up',
      {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `email='${emailUp}&pwd=${pwdUp}`
        });
        var resp = await response.json();
        setIsLogin(resp.login)
        setMessageUp(resp.message)
        props.addToken(resp.token)
      console.log(resp )
      }
    }

    
//Fonction Sign IN
  const signIn = async()=>{
    var responseFetch = await fetch('/sign-in',
    {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email='${email}&pwd=${pwd}`
    });
    var response = await responseFetch.json();
    console.log(response)
    setIsLogin(response.login)
    setMessage(response.message)
    props.addToken(response.token)
  }
  if(isLogin){
  return ( <Redirect to="/sources" />)
  } else {
    return (

      <div className="Login-page" >
            {/* SIGN-IN */}
            <div className="Sign">
    <div>{message!="ok"? message : null}</div>
                    
                    <Input className="Login-input" placeholder="arthur@lacapsule.com" 
                       onChange={(e) => setEmail(e.target.value)} 
                       value={email}
                    />
  
                    <Input.Password className="Login-input" placeholder="password" 
                       onChange={(e) => setPwd(e.target.value)} 
                       value={pwd}
                    />
              <Button style={{width:'80px'}} type="primary" onClick={()=>signIn() }>Sign-in</Button>
  
            </div>
            {/* SIGN-UP */}
  
            <div className="Sign">
            <div>{messageUp!="ok"? messageUp : null}</div>
                    <Input className="Login-input" placeholder="Arthur@zzz.fr" 
                    onChange={(e) => setEmailUp(e.target.value)} 
                    value={emailUp}
                    />
  
                    <Input.Password className="Login-input" placeholder="password" 
                      onChange={(e) => setPwdUp(e.target.value)} 
                      value={pwdUp}
                    />
              <Button style={{width:'80px'}} type="primary" onClick={()=>signUp()}>Sign-up</Button>
  
            </div>
  
        </div>
    );
  }
  }

  
  function mapDispatchToProps(dispatch)   {
    return {      
      addToken: function(tok) {
          dispatch( {type: 'addToken',
           token:tok,
        } );      
       }
      }
    }



export default connect(null,mapDispatchToProps)
(ScreenHome);

