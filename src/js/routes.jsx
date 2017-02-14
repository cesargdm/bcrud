import React from 'react'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import Login from "./components/Login.jsx"
import App from "./components/App.jsx"
import Dashboard from "./components/Dashboard.jsx"
import ArticleDetail from "./components/ArticleDetail.jsx"
import AddArticle from "./components/AddArticle.jsx"

import Auth from "./auth.js"

const isLoggedIn = (nextState, replace, callback) => {
  if (!Auth.loggedIn()) {
    replace('/login')
    callback()
  } else {
    callback()
  }
}

console.log('Stuff');

const Routes = (
  <Router history={hashHistory}>
    <Route path="/login" component={Login}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" onEnter={isLoggedIn} component={Dashboard}/>
      <Route path="add" onEnter={isLoggedIn} component={AddArticle}/>
      <Route path="article/:id" onEnter={isLoggedIn} component={ArticleDetail}/>
    </Route>
  </Router>
)

export default Routes
