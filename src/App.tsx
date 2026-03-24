import Spline from '@splinetool/react-spline';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Background Spline 3D Scene */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: 'auto'
      }}>
        <Spline scene="https://prod.spline.design/2e6SaazO50UTfKlI/scene.splinecode" />
      </div>

      {/* Dark Overlay to make text readable over the 3D background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(13, 13, 18, 0.75)',
        zIndex: 1, 
        pointerEvents: 'none'
      }} />

      {/* Background ambient gradient */}
      <div 
        style={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(176,0,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      
      {/* Foreground Content */}
      <div style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar />
        
        <main style={{ flex: 1, position: 'relative' }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
