import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
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
