import { projectsData } from '../data/portfolioData';
import { ExternalLink, Gamepad2 } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
          A selection of games and systems I've developed.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {projectsData.map((project) => (
            <div key={project.id} className="glass-panel glow-on-hover" style={{ 
              display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' 
            }}>
              {/* Card Header (Icon/Image Placeholder) */}
              <div style={{ 
                height: '160px', 
                background: 'rgba(0,0,0,0.4)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--glass-border)',
                position: 'relative'
              }}>
                 <Gamepad2 size={64} color="var(--accent-neon-blue)" opacity={0.2} />
                 <div style={{
                   position: 'absolute', top: '16px', right: '16px',
                   background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-neon-blue)',
                   padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800
                 }}>
                   GAME
                 </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#fff' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                  {project.desc}
                </p>
                
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    color: 'var(--accent-neon-blue)', fontWeight: 600, fontSize: '0.9rem',
                    textTransform: 'uppercase', letterSpacing: '1px'
                  }}>
                    Play Now <ExternalLink size={16} />
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    * Link unavailable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
