import React from 'react'
import { Route } from 'react-router-dom'
import { Footer } from '../pages/footer'
import { Header } from '../pages/header'
import { Page } from '../pages/page'

const App = () => {
 return (
  <div className='app'>
   <Header />
   <Route exact path='/' render={() => <Page />} />
   <Footer />
  </div>
 )
}

export default App
