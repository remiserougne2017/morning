import React,{useState,useEffect} from 'react';
import './App.css';
import ScreenHome from './ScreenHome';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';  
import Sources from './ScreenSource';
import ArticleBySources from './ScreenArticlesBySource';
import Articles from './ScreenMyArticles';

import articlesWish from './reducer/addArticle.reducer';
import token from './reducer/token';
import lang from './reducer/language';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';


const store = createStore(combineReducers({articlesWish,token,lang}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <div>
          <Switch>
            <Route path='/' exact component={ScreenHome}/>
            <Route path='/sources' component={Sources}/>
            <Route path='/news/:id' component={ArticleBySources}/>
            <Route path='/myArticles' component={Articles}/>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
