import React from 'react';
import SoftwareEngApp from './SoftwareEngApp';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import 'lenis/dist/lenis.css';
import './App.css';

function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <SoftwareEngApp />
    </>
  );
}

export default App;
