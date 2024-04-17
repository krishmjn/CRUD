import React from 'react'
import Form from './components/form.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import Profiles from './components/Profiles'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="profiles" element={<Profiles />} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App