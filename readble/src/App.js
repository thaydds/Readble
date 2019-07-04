import React, { Component } from 'react'
import {Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import PostForm from './components/FormPost'
import PostDetail from './components/PostDetail'


class App extends Component {
  render() {
    return (
      <React.Fragment>
         <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id?" component={PostDetail} />
        <Route exact path="/add" component={PostForm} />
        <Route exact path="/edit/:id?" component={PostForm} />
        <Route exact path="/:category" component={Home} />
     </Switch>  
      </React.Fragment>    
    )
  }
}



export default (App)