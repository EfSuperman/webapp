import { personalInfo } from '../data/portfolioData';
import { Briefcase } from 'lucide-react';

const About = () => {
  return (
    <section id="about" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Bio Section */}
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>About <span className="text-gradient">Me</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            {personalInfo.bio}
          </p>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ color: 'var(--accent-neon-blue)', fontSize: '1.2rem', margin: 0 }}>Education</h3>
            <p style={{ margin: 0, fontWeight: 500 }}>{personalInfo.education}</p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {personalInfo.experience.map((exp, idx) => (
              <div key={idx} className="glass-panel glow-on-hover" style={{ padding: '1.5rem', position: 'relative' }}>
                {/* Timeline Neon Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '24px',
                  width: '12px', height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-neon-purple)',
                  boxShadow: '0 0 10px var(--accent-neon-purple)'
                }}></div>
                {/* Timeline Line (Only on first item to simplify) */}
                {idx === 0 && (
                  <div style={{
                    position: 'absolute',
                    left: '-19px',
                    top: '36px',
                    width: '2px', height: '120px',
                    background: 'var(--glass-border)'
                  }}></div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '1.25rem' }}>{exp.title}</h3>
                  <span style={{ color: 'var(--accent-neon-blue)', fontSize: '0.9rem', fontWeight: 600 }}>{exp.dates}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Briefcase size={16} /> <span>{exp.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
