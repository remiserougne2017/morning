import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  //ajputer wishlist en BDD
  const deleteArticleBdd = async (tok, title) => {
    var response = await fetch(`/deleteArticleBdd/${tok}/${title}`,
    {
        method: 'DELETE',
      //  headers: {'Content-Type':'application/x-www-form-urlencoded'},
       // body: `id=${a}&title=${b}&desc=${c}&img=${d}&lang=${e}&token=${f}`
      });

  }

var TrueArticles = props.articles.map((FakeArticles,i)=>{
  return (
  <Card key={i}
    style={{  
      width: 300, 
      margin:'15px', 
      display:'flex',
      flexDirection: 'column',
      justifyContent:'space-between' }}
    cover={
    <img
        alt="example"
        src={FakeArticles.image}
    />
    
    }
    
    actions={[
      <Icon type="read" key="ellipsis2" />,
        <Icon type="delete" key="ellipsis" onClick={()=>{props.DeleteFromWishList(FakeArticles.title);
          deleteArticleBdd(props.token, FakeArticles.title)}}/>
    ]}
    >
      
    <Meta
      title={FakeArticles.title}
      description={FakeArticles.description}
    />
</Card>
  );
})

  return (
  <div>
    <Nav/>
      <div className="Banner"/>
        <div className="Card">
        <div> {props.articles.length==0?"Aucun article sélectionné":null}</div>
          <div  style={{display:'flex',justifyContent:'center'}}>
            {TrueArticles}
          </div>
        </div>
      </div>
  )};
  
  function mapDispatchToProps(dispatch)   {
    return {      
      DeleteFromWishList: function(title) {
          dispatch( {type: 'deleteArticle',
           titleF:title,
        } );      
       }
      }
    }

function mapStateToProps(state) {
  return { articles: state.articlesWish,
          token:state.token }
}


export default connect(mapStateToProps,mapDispatchToProps)
(ScreenMyArticles);

