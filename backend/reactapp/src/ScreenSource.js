import React,{useState,useEffect} from 'react';
import './App.css';
//
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link,Redirect } from "react-router-dom";
import ArticleBySource from './ScreenArticlesBySource';
import {connect} from 'react-redux';
import { set } from 'mongoose';

function ScreenSource(props) {
  const [newsList, setNewsList] = useState([])
  const [idSource, setIdSource] = useState('')
  const [country,setCountry] = useState(props.lang)
  const[styleFlagFr,setStyleFlagFr]=useState("fr")
  const[styleFlagUs,setStyleFlagUs]=useState("none")


//Initialisation de l'app
const newsInit = async ()=>{
  var rawResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=a8560dcd3a7f412db73e4dd1448b0858&country=${country}`);
  var response = await rawResponse.json();;
  if(response.status=="ok"){
   console.log(response)
   setNewsList(response.sources);
  }else{
   setNewsList([])
  }
 };
 /********************fin de la fontion newsInit */

useEffect(()=>{
  setCountry(props.lang)
  newsInit()
},[country])

//changement lang
const changeLang = (lang) =>{
  setCountry(lang)
  props.country(lang)
  if(lang=="fr"){
setStyleFlagFr("dotted")
setStyleFlagUs("none")
  }else{
    setStyleFlagUs("dotted")
    setStyleFlagFr("none")
  }
}

var clickSource = (id) =>{
    setIdSource(id)
   return ( <ArticleBySource idSource={id} />)
}   
console.log("id source au click",idSource,"flag",)

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
          <div className="flag">
            <img src="../images/france-flag-round-icon-32.png" width="32px" style={{marginLeft:"5px", cursor : "pointer", outlineStyle: styleFlagFr}} onClick={()=>changeLang("fr")}/>
            <img src="../images/united-kingdom-flag-round-icon-32.png"  style={{marginLeft:"5px", cursor : "pointer",outlineStyle: styleFlagUs}} onClick={()=>changeLang("us")} width="32px"/>
          </div>
         </div>
        
       <div className="HomeThemes">
              <List
                  itemLayout="horizontal"
                  dataSource={newsList}
                  renderItem={item => (

                    <List.Item>
                      <List.Item.Meta
                        avatar={item.category=="sports"? <Avatar src="../images/sports.png" /> :
                        item.category=="general"? <Avatar src="../images/general.png" /> :
                        item.category=="business"? <Avatar src="../images/business.png" /> :
                        null}
                        title={ <Link to={`/news/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapDispatchToProps(dispatch)   {
  return {      
    country: function(lang) {
      console.log("fct to reducer",lang)
        dispatch( {type: 'changeLang',
         lang:lang,
      } );      
     }
    }
  }

function mapStateToProps(state) {
  return { articles: state.articlesWish,
    token:state.token,
    lang : state.lang}
}


export default connect(mapStateToProps,mapDispatchToProps)
(ScreenSource);


