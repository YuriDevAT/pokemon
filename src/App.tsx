import React from 'react';
import Pokedex from './components/Pokedex';
//import Pokemon from './components/Pokemon';
import ErrorPage from './components/ErrorPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      {/* <Route path='/pokemon/:id' element={<Pokemon />} /> */}
      <Route path="/pokemon_escaped" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
