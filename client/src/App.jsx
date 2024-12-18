<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import Container from './components/Container'
import About from './components/About'
import Services from './components/Services'
import ContactUs from './components/ContactUs'

=======
import { useState } from 'react';
import './App.css';
import Dashboard from './components/admin/Dashboard.jsx';
>>>>>>> 6231c66c45a20afb999313058d61e14b441195cd

function App() {
  return (
<<<<<<< HEAD
    <div id='home'>
     <Navbar />
     <Container />
     <Services />
     <About />
     <ContactUs />
    </div>
  )
=======
    <div>
      <h1>Denri</h1>
      <Dashboard />  {/* Ensure the Dashboard component is used here */}
    </div>
  );
>>>>>>> 6231c66c45a20afb999313058d61e14b441195cd
}

export default App;
