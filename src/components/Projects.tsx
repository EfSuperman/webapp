import { useState, useEffect } from 'react';
// Last Update: 2026-03-24 16:20 - Added Grid Flow Fix & Show More Feature
import { projectsData } from '../data/portfolioData';
import { ExternalLink, Gamepad2, X, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<typeof projectsData[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Show only 6 projects initially, or all if expanded
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

  return (
    <section id="projects" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
          A selection of games and systems I've developed. Click a video to enlarge.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2.5rem',
          gridAutoFlow: 'dense' // FIX: Fills in gaps caused by span 2 items
        }}>
          {displayedProjects.map((project) => {
            const isPortrait = project.layoutType === 'portrait';
            
            return (
              <div 
                key={project.id} 
                className={`glass-panel glow-on-hover ${isPortrait ? 'project-card-portrait' : ''}`}
                style={{ 
                  display: 'flex', 
                  flexDirection: isPortrait ? 'row' : 'column', 
                  overflow: 'hidden', 
                  height: '100%',
                  gridColumn: 'span 1', // Unified size
                  minHeight: isPortrait ? '280px' : 'auto'
                }}
              >
                {/* Image/Video Container */}
                <div 
                  className="project-image-container"
                  onClick={() => setActiveVideo(project)}
                  style={{ 
                    height: isPortrait ? (window.innerWidth <= 768 ? '220px' : '100%') : '220px', 
                    background: 'rgba(0,0,0,0.6)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderBottom: isPortrait && window.innerWidth > 768 ? 'none' : '1px solid var(--glass-border)',
                    borderRight: isPortrait && window.innerWidth > 768 ? '1px solid var(--glass-border)' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'crosshair',
                    flexShrink: 0
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}></div>

                  {project.youtubeId ? (
                     <iframe 
                       width="100%" height="100%" 
                       src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}`} 
                       title={project.name} frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       style={{ pointerEvents: 'none', transform: isPortrait ? 'scale(1.1)' : 'scale(1.4)' }} 
                     ></iframe>
                   ) : project.loomId ? (
                     <iframe 
                       width="100%" height="100%" 
                       src={`https://www.loom.com/embed/${project.loomId}?autoplay=1&muted=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&loop=1`}
                       frameBorder="0" allowFullScreen 
                       style={{ pointerEvents: 'none', transform: isPortrait ? 'scale(1.8)' : 'scale(1.1)' }}
                     ></iframe>
                   ) : project.iframeUrl ? (
                     <iframe 
                       width="100%" height="100%" 
                       src={project.iframeUrl} title={project.name} 
                       frameBorder="0" allowFullScreen 
                       style={{ pointerEvents: 'none', transform: isPortrait ? 'scale(1.0)' : 'scale(1.05)' }}
                     ></iframe>
                   ) : project.videoUrl ? (
                     <video 
                       src={project.videoUrl} 
                       autoPlay muted playsInline loop
                       style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                     />
                   ) : (
                     <Gamepad2 size={64} color="var(--accent-neon-blue)" opacity={0.2} />
                   )}
                   <div style={{
                     position: 'absolute', top: '16px', right: '16px', zIndex: 20,
                     background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-neon-blue)',
                     padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800,
                     backdropFilter: 'blur(4px)', border: '1px solid var(--accent-neon-blue)',
                     boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)', pointerEvents: 'none'
                   }}>
                     {isPortrait ? 'MOBILE' : 'PC'}
                   </div>
                </div>

                {/* Content Container */}
                <div className="project-content-container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'rgba(10, 10, 15, 0.6)' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#fff' }}>{project.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                    {project.desc}
                  </p>
                  
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', alignItems: 'center', gap: '8px', 
                      color: 'var(--accent-neon-blue)', fontWeight: 600, fontSize: '0.9rem',
                      letterSpacing: '1px'
                    }}>
                      Play Now <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      * Direct link unavailable
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="glow-on-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid var(--accent-neon-blue)',
              color: 'var(--accent-neon-blue)',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'crosshair',
              transition: 'all 0.3s'
            }}
          >
            {showAll ? (
              <>Show Less <ChevronUp size={20} /></>
            ) : (
              <>Show More Projects <ChevronDown size={20} /></>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div 
          onClick={() => setActiveVideo(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            backgroundColor: 'rgba(5, 6, 8, 0.95)', backdropFilter: 'blur(15px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={() => setActiveVideo(null)}
            style={{ 
              position: 'absolute', top: '2rem', right: '2rem', 
              background: 'transparent', border: 'none', color: 'var(--text-secondary)', 
              zIndex: 100, cursor: 'crosshair', transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-neon-pink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={48} />
          </button>
          
          {/* Video Container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              width: activeVideo.layoutType === 'portrait' ? '380px' : '90%', 
              maxWidth: '1200px', 
              height: activeVideo.layoutType === 'portrait' ? '80vh' : '70vh', 
              flexShrink: 0,
              position: 'relative', borderRadius: '12px', overflow: 'hidden', 
              border: '2px solid var(--accent-neon-blue)', 
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.3)',
              backgroundColor: '#000', cursor: 'auto'
            }}
          >
            {activeVideo.youtubeId ? (
               <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&controls=1&mute=0`} frameBorder="0" allowFullScreen></iframe>
             ) : activeVideo.loomId ? (
               <iframe width="100%" height="100%" src={`https://www.loom.com/embed/${activeVideo.loomId}?autoplay=1&muted=0`} frameBorder="0" allowFullScreen></iframe>
             ) : activeVideo.iframeUrl ? (
               <iframe width="100%" height="100%" src={activeVideo.iframeUrl} frameBorder="0" allowFullScreen></iframe>
             ) : activeVideo.videoUrl ? (
               <video src={activeVideo.videoUrl} autoPlay controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             ) : (
               <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <Gamepad2 size={100} color="var(--text-secondary)" opacity={0.3} />
                 <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>No Video Media Available</p>
               </div>
             )}
          </div>
          
          {/* Project Title at the bottom */}
          <h2 style={{ 
            color: 'var(--accent-neon-blue)', 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            marginTop: '2.5rem', 
            textTransform: 'uppercase', 
            letterSpacing: '4px',
            textAlign: 'center',
            filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.4))'
          }}>
            {activeVideo.name}
          </h2>
        </div>
      )}
    </section>
  );
};

export default Projects;
