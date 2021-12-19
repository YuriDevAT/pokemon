import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Pokedex = lazy(() => import('./components/Pokedex'));
const Pokemon = lazy(() => import('./components/Pokemon'));

const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path='/' element={<Pokedex />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
      </Routes>
    </Suspense>
  );
}

export default App;
