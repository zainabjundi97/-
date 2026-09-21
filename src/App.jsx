import { useEffect } from 'react';
import AcademicApp from './pages/AcademicApp';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './lib/gsap';
import 'lenis/dist/lenis.css';
import './App.css';

function App() {
  useLenis();

  // Web font swap changes text heights — re-measure scroll triggers once Cairo has loaded.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <ScrollProgress />
      <AcademicApp />
    </>
  );
}

export default App;
