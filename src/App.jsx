import React from 'react';
import SoftwareEngApp from './SoftwareEngApp';
import { useLenis } from './hooks/useLenis';
import 'lenis/dist/lenis.css';
import './App.css';

function App() {
  useLenis();

  return <SoftwareEngApp />;
}

export default App;
