import React from 'react'
import Create from './Components/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './Components/Read';
import Header from './Components/Header';
const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route exact path='/' element={<Read />}></Route>
        <Route path='/create' element={<Create />}>

        </Route>
        <Route path='/edit/:id' element={<Create/>}>

</Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;