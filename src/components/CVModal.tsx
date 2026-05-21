import { X, Download, Share2, Mail, Phone, Link, GraduationCap, Briefcase, Code, User, Award, ExternalLink } from 'lucide-react';

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CVModal = ({ isOpen, onClose }: CVModalProps) => {
    if (!isOpen) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/Resume-RohanNaveed-GameDev.pdf';
        link.download = 'Resume-RohanNaveed-GameDev.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Portfolio link copied to clipboard!');
    };

    return (
        <div 
            className="cv-modal-overlay"
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000000,
                backgroundColor: 'rgba(5, 6, 8, 0.98)',
                backdropFilter: 'blur(25px)',
                display: 'flex',
                justifyContent: 'center',
                padding: '1.5rem',
                overflowY: 'auto',
                cursor: 'pointer',
                animation: 'modalFadeIn 0.4s ease-out'
            }}
        >
            <div 
                className="cv-content glass-panel"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    height: 'fit-content',
                    background: 'rgba(15, 15, 25, 0.85)',
                    padding: '0',
                    borderRadius: '12px',
                    border: '1px solid var(--accent-neon-blue)',
                    boxShadow: '0 0 60px rgba(0, 240, 255, 0.15)',
                    position: 'relative',
                    cursor: 'default',
                    color: '#fff',
                    overflow: 'hidden'
                }}
            >
                {/* Visual Accent Bar */}
                <div style={{
                    height: '6px',
                    width: '100%',
                    background: 'linear-gradient(90deg, var(--accent-neon-blue), var(--accent-neon-purple), var(--accent-neon-pink))',
                }} />

                {/* Control Buttons - Hidden during print */}
                <div 
                    className="no-print"
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        display: 'flex',
                        gap: '0.8rem',
                        zIndex: 10
                    }}
                >
                    <button onClick={handleShare} className="cv-icon-btn" title="Share Portfolio">
                        <Share2 size={20} />
                    </button>
                    <button onClick={handleDownload} className="cv-icon-btn" title="Download CV (Print to PDF)">
                        <Download size={20} />
                    </button>
                    <button onClick={onClose} className="cv-icon-btn close-btn" title="Close">
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '4rem' }}>
                    {/* CV Header */}
                    <header style={{ 
                        borderBottom: '1px solid rgba(0, 240, 255, 0.2)', 
                        paddingBottom: '3rem', 
                        marginBottom: '3rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <div>
                            <h1 style={{ 
                                fontSize: '4.5rem', 
                                marginBottom: '0.5rem', 
                                color: '#fff', 
                                fontFamily: 'var(--font-display)',
                                letterSpacing: '2px',
                                textShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
                            }}>
                                ROHAN <span className="text-gradient">NAVEED</span>
                            </h1>
                            <p style={{ 
                                fontSize: '1.4rem', 
                                color: 'var(--accent-neon-blue)', 
                                fontWeight: 600, 
                                letterSpacing: '5px',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem'
                            }}>
                                Senior Game Developer & Gameplay Engineer
                            </p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={18} className="icon-glow" /> rohanndeveloperr@gmail.com
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Phone size={18} className="icon-glow" /> +92 324 4283084
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Link size={18} className="icon-glow" /> github.com/EfSuperman
                                </span>
                            </div>
                        </div>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '5rem' }}>
                        {/* Left Column */}
                        <div>
                            <section style={{ marginBottom: '4rem' }}>
                                <h2 className="cv-section-title">
                                    <User size={20} /> PROFILE
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                    Passionate Game Developer with 1.5+ years of specialized experience in Unity3D and Gameplay Programming. 
                                    Expert at bridging technical constraints with creative vision to deliver high-performance interactive experiences.
                                    Driven to architect scalable game systems and lead development teams in the evolving gaming landscape.
                                </p>
                            </section>

                            <section style={{ marginBottom: '4rem' }}>
                                <h2 className="cv-section-title">
                                    <Code size={20} /> CORE TECH STACK
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { label: 'Engines', tech: 'Unity3D, Phaser.js, Unreal Engine' },
                                        { label: 'Languages', tech: 'C#, JavaScript, C++, SQL' },
                                        { label: 'Frameworks', tech: 'React, Node.js, .NET' },
                                        { label: 'Visuals', tech: 'Blender, Photoshop, Unity Shader Graph' }
                                    ].map((item, idx) => (
                                        <div key={idx}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--accent-neon-blue)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                {item.label}
                                            </p>
                                            <p style={{ color: '#fff', fontWeight: 500 }}>{item.tech}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="cv-section-title">
                                    <Award size={20} /> EXPERTISE
                                </h2>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['Level Design', 'AI Behaviors', 'Shaders/VFX', 'UI/UX Design', 'Physics Engine', 'Optimization', 'Networking'].map(skill => (
                                        <span key={skill} className="cv-skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div>
                            <section style={{ marginBottom: '4rem' }}>
                                <h2 className="cv-section-title">
                                    <Briefcase size={20} /> EXPERIENCE & KEY PROJECTS
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <div className="cv-project-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Obstacle Avoiding 3D Game</h3>
                                            <span style={{ color: 'var(--accent-neon-blue)', fontWeight: 700 }}>UNITY / C#</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            Architected a complex survival game focusing on procedural environmental interactions. 
                                            Implemented custom character controllers, dynamic difficulty scaling, and high-performance 
                                            collision detection systems optimized for desktop release.
                                        </p>
                                    </div>

                                    <div className="cv-project-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Automated Highlight Generator (FYP)</h3>
                                            <span style={{ color: 'var(--accent-neon-purple)', fontWeight: 700 }}>AI / COMPUTER VISION</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            Developed a pioneering AI tool that analyzes football match broadcasts to auto-generate 
                                            highlights. Integrated voice-command recognition for custom clip generation, processing 
                                            complex multimedia metadata in real-time.
                                        </p>
                                    </div>

                                    <div className="cv-project-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Phaser Interactive Runner</h3>
                                            <span style={{ color: 'var(--accent-neon-pink)', fontWeight: 700 }}>PHASER.JS / WEB</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            Created a collection of high-engagement web games (Snake, Dash, Circuit) optimized for browser play. 
                                            Focused on low-latency input handling and cross-device compatibility.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="cv-section-title">
                                    <GraduationCap size={20} /> EDUCATION
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ borderLeft: '2px solid var(--accent-neon-blue)', paddingLeft: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>Minhaj University Lahore</h3>
                                        <p style={{ color: 'var(--accent-neon-blue)', fontWeight: 600 }}>Bachelor of Computer Science (BSCS)</p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Focused on Algorithm Design & Interaction Systems</p>
                                    </div>
                                    <div style={{ borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>Shalimar College</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>Intermediate of Computer Science (ICS)</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <footer style={{ 
                    padding: '2rem 4rem', 
                    background: 'rgba(5, 6, 8, 0.4)', 
                    borderTop: '1px solid rgba(0, 240, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3rem'
                }}>
                    <a href="https://github.com/EfSuperman" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <ExternalLink size={16} /> PORTFOLIO PROJECTS
                    </a>
                </footer>

                <style>{`
                    @keyframes modalFadeIn {
                        from { opacity: 0; transform: scale(0.95) translateY(20px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .cv-section-title {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        color: #fff;
                        margin-bottom: 2rem;
                        font-size: 1.3rem;
                        letter-spacing: 3px;
                        position: relative;
                    }
                    .cv-section-title::after {
                        content: '';
                        position: absolute;
                        bottom: -8px;
                        left: 0;
                        width: 40px;
                        height: 2px;
                        background: var(--accent-neon-blue);
                    }
                    .cv-icon-btn {
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(0, 240, 255, 0.2);
                        color: var(--text-secondary);
                        padding: 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: 0.3s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .cv-icon-btn:hover {
                        background: rgba(0, 240, 255, 0.1);
                        color: var(--accent-neon-blue);
                        border-color: var(--accent-neon-blue);
                        transform: translateY(-2px);
                        box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                    }
                    .close-btn:hover {
                        background: rgba(255, 46, 99, 0.1);
                        color: #ff2e63;
                        border-color: #ff2e63;
                        box-shadow: 0 0 15px rgba(255, 46, 99, 0.2);
                    }
                    .cv-skill-tag {
                        padding: 6px 16px;
                        background: rgba(0, 240, 255, 0.05);
                        border: 1px solid rgba(0, 240, 255, 0.15);
                        border-radius: 2px;
                        font-size: 0.85rem;
                        color: var(--text-secondary);
                        transition: 0.3s;
                    }
                    .cv-skill-tag:hover {
                        background: rgba(0, 240, 255, 0.1);
                        border-color: var(--accent-neon-blue);
                        color: #fff;
                    }
                    .icon-glow {
                        color: var(--accent-neon-blue);
                        filter: drop-shadow(0 0 5px var(--accent-neon-blue));
                    }
                    .cv-project-card {
                        padding: 1.5rem;
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        border-radius: 4px;
                        transition: 0.3s;
                    }
                    .cv-project-card:hover {
                        background: rgba(255, 255, 255, 0.04);
                        border-color: rgba(0, 240, 255, 0.2);
                        transform: translateX(10px);
                    }
                    @media print {
                        @page {
                            size: A4;
                            margin: 10mm;
                        }
                        
                        /* Hide everything background-related in App.tsx */
                        nav, footer, .no-print, 
                        #about, #skills, #extra-skills, #projects, #phaser-games,
                        .app-container > div:nth-child(1), /* Loading Screen */
                        .app-container > div:nth-child(2), /* Spline Scene */
                        .app-container > div:nth-child(3), /* Dark Overlay */
                        .app-container > div:nth-child(4), /* Ambient Gradient */
                        #hero > .container /* Hero text content */ {
                            display: none !important;
                            visibility: hidden !important;
                        }

                        /* Deep Reset for Print Flow */
                        html, body, #root, .app-container, [style*="zIndex: 10"] {
                            height: auto !important;
                            min-height: auto !important;
                            overflow: visible !important;
                            position: static !important;
                            display: block !important;
                        }

                        /* Reset Body and HTML */
                        body { 
                            background: #fff !important; 
                            color: #000 !important; 
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        /* Ensure modal overlay doesn't clip content */
                        .cv-modal-overlay { 
                            position: static !important; 
                            width: 100% !important; 
                            background: #fff !important; 
                            display: block !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            overflow: visible !important;
                            visibility: visible !important;
                        }

                        .cv-content { 
                            background: #fff !important; 
                            width: 100% !important; 
                            max-width: 100% !important; 
                            margin: 0 !important;
                            padding: 0 !important;
                            box-shadow: none !important; 
                            border: none !important; 
                            border-radius: 0 !important;
                            position: relative !important;
                            display: block !important;
                            overflow: visible !important;
                            visibility: visible !important;
                        }

                        /* Ensure Grid doesn't break multi-page flow */
                        div[style*="display: grid"] {
                            display: block !important;
                        }

                        /* Force visibility on all children */
                        .cv-content * {
                            visibility: visible !important;
                        }

                        section {
                            page-break-inside: avoid;
                            break-inside: avoid;
                            margin-bottom: 2rem !important;
                        }

                        header { 
                            border-bottom: 2px solid #000 !important; 
                            margin-bottom: 25px !important;
                            padding-bottom: 20px !important;
                        }

                        .text-gradient { 
                            -webkit-text-fill-color: initial !important; 
                            background: none !important; 
                            color: #000 !important; 
                            font-weight: 800 !important;
                        }

                        .cv-section-title { 
                            border-bottom: 2px solid #000 !important; 
                            padding-bottom: 5px !important;
                            color: #000 !important;
                        }
                        
                        .cv-skill-tag { 
                            border: 1px solid #ccc !important; 
                            color: #000 !important; 
                            background: #f9f9f9 !important; 
                        }

                        .cv-project-card { 
                            border-bottom: 1px solid #eee !important;
                            margin-bottom: 15px !important;
                        }
                    }
                    @media (max-width: 768px) {
                        .cv-modal-overlay { padding: 0.75rem !important; }
                        .cv-content { padding: 0 !important; max-width: 100% !important; }
                        .cv-content > div[style*="padding: 4rem"] { padding: 1.25rem !important; }
                        .cv-content header {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            padding-bottom: 1.5rem !important;
                            margin-bottom: 1.5rem !important;
                        }
                        .cv-content h1 {
                            font-size: clamp(1.8rem, 8vw, 2.4rem) !important;
                            letter-spacing: 1px !important;
                            line-height: 1.1 !important;
                        }
                        .cv-content header p {
                            font-size: 0.9rem !important;
                            letter-spacing: 2px !important;
                        }
                        .cv-content header > div > div {
                            flex-direction: column !important;
                            gap: 0.6rem !important;
                            font-size: 0.85rem !important;
                        }
                        .cv-content header > div > div span {
                            word-break: break-all;
                        }
                        .cv-content div[style*="grid"][style*="gap: 5rem"] {
                            grid-template-columns: 1fr !important;
                            gap: 2.5rem !important;
                        }
                        .cv-content footer {
                            padding: 1rem 1.25rem !important;
                            flex-direction: column !important;
                            gap: 0.75rem !important;
                            text-align: center;
                        }
                        .cv-content .no-print {
                            top: 0.75rem !important;
                            right: 0.75rem !important;
                            gap: 0.5rem !important;
                        }
                        .cv-icon-btn { padding: 8px !important; }
                        .cv-project-card { padding: 1rem !important; }
                        .cv-project-card > div {
                            flex-direction: column !important;
                            gap: 4px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default CVModal;

