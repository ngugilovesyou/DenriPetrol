/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import Container from './components/Container'
import About from './components/About'
import Services from './components/Services'
import ContactUs from './components/ContactUs'
// import Dashboard from './components/admin/Dashboard.jsx';

function App() {
  return (
    <div id='home'>
     <Navbar />
     <Container />
     <Services />
     <About />
     <ContactUs />
     {/* <Dashboard />   */}
    </div>
  )
    
  
}

export default App;

