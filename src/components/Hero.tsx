import { personalInfo } from '../data/portfolioData';
import { ChevronRight, FileText } from 'lucide-react';
import { useState } from 'react';
import CVModal from './CVModal';

const Hero = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);

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
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#projects" className="glow-on-hover" style={{
              background: 'linear-gradient(135deg, var(--accent-neon-blue), var(--accent-neon-purple))',
              color: '#000',
              padding: '14px 40px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '1.1rem',
              width: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}>
              View Work <ChevronRight size={20} />
            </a>

            <button 
              onClick={() => setIsCVOpen(true)}
              className="glow-on-hover" 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--accent-neon-blue)',
                color: 'var(--accent-neon-blue)',
                padding: '14px 40px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1.1rem',
                width: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              <FileText size={20} /> View CV
            </button>
          </div>
        </div>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
};

export default Hero;
