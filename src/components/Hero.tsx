import { personalInfo } from '../data/portfolioData';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px', // offset for navbar
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 10,
        width: '100%'
      }}>
        {/* Text Content */}
        <div style={{ maxWidth: '800px' }} className="animate-fade-in">
          <p style={{ color: 'var(--accent-neon-blue)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Hi, my name is
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1rem', color: '#fff' }}>
            {personalInfo.name}.
          </h1>
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            {personalInfo.title}.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', marginInline: 'auto', maxWidth: '600px' }}>
            {personalInfo.tagline} {personalInfo.bio}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#projects" className="glow-on-hover" style={{
              background: 'linear-gradient(135deg, var(--accent-neon-blue), var(--accent-neon-purple))',
              color: '#000',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              View Work <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
