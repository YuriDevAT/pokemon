import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      <Route path='/pokemon/:id' element={<Pokemon />} />
    </Routes>
  );
}

export default App;
