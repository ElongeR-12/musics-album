import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

import Home from './Home'
import SingleMusic from './SingleMusic'

function App() {
  return (
    <>
    <Header/>
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/musics/:id' children={<SingleMusic/>} />
    </Switch>
    <Footer/>
    </>
    
  )
}

export default App
