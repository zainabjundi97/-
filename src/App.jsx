import React from 'react';
import AcademicApp from './pages/AcademicApp';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import 'lenis/dist/lenis.css';
import './App.css';

function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <AcademicApp />
    </>
  );
}

export default App;
