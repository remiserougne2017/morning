import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, Icon,List,Avatar,IconText,ListData,Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
console.log(props.token)

  const [articleList,setArticleList]=useState([])
  const [state,setState]=useState(false)
  const [modalData,setModaldata]=useState({})
  
  //ajputer wishlist en BDD
  const addArticleBdd = async (a,b,c,d,e)=>{
    var response = await fetch('/addArticleBdd',
    {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `id=${a}&title=${b}`
      });

  }

  useEffect(()=>{
    const ArticlesList = async ()=>{
      
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=a8560dcd3a7f412db73e4dd1448b0858&sources=${props.match.params.id}`);
      var response = await rawResponse.json();
      if(response.status=="ok"){
      setArticleList(response.articles);
      }
    }
    ArticlesList();
  },[]) 


 const readClick = (id,titleF,descF,url) => {
 setState(true)
 setModaldata({"src":id, "title":titleF, "desc": descF,"url":url})
  }

  const readClickOff = () => {
    setState(false)
    setModaldata({})
     }
     console.log("modal : ",modalData)
   
var articleListMap = articleList.map((item,i)=>{

  var isInWishList = false
if(props.articles.findIndex(e=>e.title==item.title) !==-1){
  var color= {color:"green"}
  isInWishList = true
}else{
  isInWishList= false
}
console.log(isInWishList)
  return (
    <List.Item key={i}>
    <div className="Card">
  <div  style={{display:'flex',justifyContent:'center'}}>
  <Card 
  style={{  
  width: 300, 
  height:500,
  margin:'15px', 
  display:'flex',
  flexDirection: 'column',
  /*// justifyContent:'space-between'*/ }}
  cover={
  <img
    style={{height:165}}
    alt="example"
    src={item.urlToImage}
  />
  }
  actions={[
  <Icon onClick={()=>readClick(item.source.name, item.title, item.description,item.urlToImage)} type="read" key="ellipsis2"/>,
  <Icon type="like" key="heart" style={color} onClick={() =>{props.addToWishList(item.source.name, item.title, item.description,item.urlToImage,isInWishList);
    addArticleBdd(item.source.name, item.title, item.description,item.urlToImage,item.language)}}/>
  ]}
  >
  <Meta 
  title={item.title}
  description={item.description}
  />
  </Card>
  </div>
  </div> 
  </List.Item>
  )

})
  return (
    <div>
      <Nav/>
       <div className="Banner"/>
        <List
    grid={{ gutter:0,
      xs: 1,
      sm: 3,
      lg: 4 }}>
        {articleListMap}
      </List> 
         <div>
            <Modal
              title={modalData.src}
              visible={state}
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: true }} 
              // onOk={this.handleOk}
              onCancel={()=> readClickOff()}
            >
              <img src={modalData.url} style={{width: "100%"}}/>
              <p style={{fontSize:20,color:"green"}}>{modalData.title}</p>
              <p>{modalData.desc}</p>
            </Modal>
          </div>
      </div>
        
  )};

  function mapDispatchToProps(dispatch){
    return {  
      addToWishList: function(source, title ,desc, image,bool) {
        if(bool==true){
          var typeAction= 'deleteArticle'
        }else{
          var typeAction= 'addArticle'
        }
          dispatch( {type: typeAction,
          sourceF:source,
           titleF:title,
          descF:desc,
          url:image,
        } )
       }
      }
    }

    function mapStateToProps(state) {
      return { articles: state.articlesWish,
        token:state.token }
    }
    
    
    export default connect(mapStateToProps,mapDispatchToProps)
    (ScreenArticlesBySource);
    
  