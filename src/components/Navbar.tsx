import { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1rem 0',
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>
            <Gamepad2 color="var(--accent-neon-blue)" /> 
            ROHAN<span style={{ color: 'var(--accent-neon-blue)' }}>.DEV</span>
          </a>
          
          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-links">
            {['About', 'Skills', 'Projects', 'Games'].map(link => (
              <a key={link} href={`#${link === 'Games' ? 'phaser-games' : link.toLowerCase()}`} style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }} className="glow-on-hover">
                {link}
              </a>
            ))}
            <a href="#contact" className="glow-on-hover nav-pulse" style={{ 
              fontWeight: 800, 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              padding: '8px 20px',
              borderRadius: '4px',
              background: 'rgba(0, 240, 255, 0.1)',
              color: 'var(--accent-neon-blue)'
            }}>
              Say Hello
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            style={{ 
              display: 'none', 
              background: 'transparent', 
              border: 'none', 
              color: '#fff', 
              cursor: 'pointer',
              zIndex: 1001 
            }}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {['About', 'Skills', 'Projects', 'Games', 'Contact'].map(link => (
          <a 
            key={link} 
            href={`#${link === 'Games' ? 'phaser-games' : link.toLowerCase()}`} 
            onClick={() => setIsMenuOpen(false)}
            style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#fff', 
              fontFamily: 'var(--font-display)',
              letterSpacing: '2px'
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
