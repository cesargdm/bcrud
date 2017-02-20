import React from 'react'
import { Router, Route, Link, hashHistory, IndexRedirect } from 'react-router'

import Login from "./components/Login.jsx"
import App from "./components/App.jsx"
import Dashboard from "./components/Dashboard.jsx"
import ArticleDetail from "./components/ArticleDetail.jsx"
import AddArticle from "./components/AddArticle.jsx"
import AddHero from "./components/AddHero.jsx"

import Auth from "./auth.js"

const isLoggedIn = (nextState, replace, callback) => {
  if (!Auth.loggedIn()) {
    replace('/login')
    callback()
  } else {
    callback()
  }
}

const Routes = (
  <Router history={hashHistory}>
    <Route path="/login" component={Login}/>
    <Route path="/" component={App}>
      <IndexRedirect to='dashboard'/>
      <Route path="add-hero" onEnter={isLoggedIn} component={AddHero}/>
      <Route path="dashboard" onEnter={isLoggedIn} component={Dashboard}/>
      <Route path="add" onEnter={isLoggedIn} component={AddArticle}/>
      <Route path="article/:id" onEnter={isLoggedIn} component={ArticleDetail}/>
    </Route>
  </Router>
)

export default Routes
