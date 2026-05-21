import { personalInfo } from '../data/portfolioData';
import { Code2, MonitorPlay, Smartphone } from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(0,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none', zIndex: -1
      }} />

      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Game Engines */}
          <div className="glass-panel glow-on-hover" style={{ padding: '2.5rem' }}>
            <MonitorPlay color="var(--accent-neon-blue)" size={48} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Game Engines</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {personalInfo.skills.engines.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid var(--accent-neon-blue)',
                  boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="glass-panel glow-on-hover" style={{ padding: '2.5rem' }}>
            <Code2 color="var(--accent-neon-blue)" size={48} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {personalInfo.skills.languages.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid var(--accent-neon-blue)',
                  boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="glass-panel glow-on-hover" style={{ padding: '2.5rem' }}>
            <Smartphone color="var(--accent-neon-blue)" size={48} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Platforms</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {personalInfo.skills.platforms.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid var(--accent-neon-blue)',
                  boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
