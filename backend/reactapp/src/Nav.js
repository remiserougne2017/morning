import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd';
import { Link,Redirect } from "react-router-dom";


function Nav(props) {

//  //log out
//  const logout = (bool)=>{
//    console.log("click logout", bool)
//   props.logoutParent(bool)
// }
  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Icon type="home" />
          <Link to='/sources'>Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
          <Link to='/myArticles'>My Articles</Link>

        </Menu.Item>

        <Menu.Item key="app">
          <Icon type="logout" /*onClick={()=>logout(false)}*//>
          Logout
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
