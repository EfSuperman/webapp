import { useState, useEffect } from 'react';
import { mobileAppsData } from '../data/portfolioData';
import { Smartphone, X, ChevronLeft, ChevronRight, Apple, Cpu, CheckCircle2 } from 'lucide-react';

const MobileApps = () => {
    const [activeApp, setActiveApp] = useState<typeof mobileAppsData[0] | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [previewIndex, setPreviewIndex] = useState<Record<number, number>>({});

    useEffect(() => {
        if (!activeApp) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveApp(null);
            if (e.key === 'ArrowRight') setSlideIndex(i => (i + 1) % activeApp.screenshots.length);
            if (e.key === 'ArrowLeft') setSlideIndex(i => (i - 1 + activeApp.screenshots.length) % activeApp.screenshots.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [activeApp]);

    // Auto-rotate preview screenshot on card
    useEffect(() => {
        const interval = setInterval(() => {
            setPreviewIndex(prev => {
                const next: Record<number, number> = {};
                mobileAppsData.forEach(app => {
                    const cur = prev[app.id] ?? 0;
                    next[app.id] = (cur + 1) % app.screenshots.length;
                });
                return next;
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const openApp = (app: typeof mobileAppsData[0]) => {
        setActiveApp(app);
        setSlideIndex(0);
    };

    const nextSlide = () => {
        if (activeApp) setSlideIndex(i => (i + 1) % activeApp.screenshots.length);
    };
    const prevSlide = () => {
        if (activeApp) setSlideIndex(i => (i - 1 + activeApp.screenshots.length) % activeApp.screenshots.length);
    };

    return (
        <section id="mobile-apps" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                    MOBILE FORGE <span className="text-gradient">BUILT WITH REACT NATIVE</span>
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
                    Cross-platform apps shipped to iOS &amp; Android — Expo, TypeScript, Firebase, and a love for clean UX.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '2.5rem',
                }}>
                    {mobileAppsData.map((app) => {
                        const activePreview = previewIndex[app.id] ?? 0;
                        return (
                            <div
                                key={app.id}
                                className="glass-panel glow-on-hover mobile-app-card"
                                onClick={() => openApp(app)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    position: 'relative'
                                }}
                            >
                                {/* Phone Mockup Preview */}
                                <div style={{
                                    height: '420px',
                                    position: 'relative',
                                    background: `radial-gradient(circle at 50% 30%, rgba(34, 184, 176, 0.18), rgba(0, 0, 0, 0.6) 70%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid var(--glass-border)',
                                    overflow: 'hidden'
                                }}>
                                    {/* Phone frame */}
                                    <div style={{
                                        width: '180px',
                                        height: '370px',
                                        borderRadius: '28px',
                                        background: '#0a0a0e',
                                        border: '3px solid rgba(0, 240, 255, 0.4)',
                                        boxShadow: `0 0 30px ${app.accent}55, inset 0 0 20px rgba(0,0,0,0.8)`,
                                        padding: '6px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Notch */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px', left: '50%', transform: 'translateX(-50%)',
                                            width: '50px', height: '14px',
                                            background: '#000', borderRadius: '10px',
                                            zIndex: 5
                                        }} />
                                        {app.screenshots.map((src, idx) => (
                                            <img
                                                key={src}
                                                src={src}
                                                alt={`${app.name} preview ${idx + 1}`}
                                                style={{
                                                    position: 'absolute',
                                                    inset: '6px',
                                                    width: 'calc(100% - 12px)',
                                                    height: 'calc(100% - 12px)',
                                                    objectFit: 'cover',
                                                    borderRadius: '22px',
                                                    opacity: idx === activePreview ? 1 : 0,
                                                    transition: 'opacity 0.8s ease-in-out'
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Platform badges */}
                                    <div style={{
                                        position: 'absolute', top: '14px', right: '14px',
                                        display: 'flex', gap: '6px'
                                    }}>
                                        {app.platforms.includes('iOS') && (
                                            <div style={{
                                                background: 'rgba(10, 10, 15, 0.85)',
                                                padding: '4px 8px', borderRadius: '4px',
                                                display: 'flex', alignItems: 'center', gap: '4px',
                                                fontSize: '0.65rem', border: '1px solid var(--glass-border)',
                                                fontWeight: 600
                                            }}>
                                                <Apple size={11} /> iOS
                                            </div>
                                        )}
                                        {app.platforms.includes('Android') && (
                                            <div style={{
                                                background: 'rgba(10, 10, 15, 0.85)',
                                                padding: '4px 8px', borderRadius: '4px',
                                                display: 'flex', alignItems: 'center', gap: '4px',
                                                fontSize: '0.65rem', border: '1px solid var(--glass-border)',
                                                fontWeight: 600
                                            }}>
                                                <Smartphone size={11} /> Android
                                            </div>
                                        )}
                                    </div>

                                    {/* Dot indicators */}
                                    <div style={{
                                        position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
                                        display: 'flex', gap: '6px'
                                    }}>
                                        {app.screenshots.map((_, idx) => (
                                            <div key={idx} style={{
                                                width: idx === activePreview ? '18px' : '6px',
                                                height: '6px',
                                                borderRadius: '3px',
                                                background: idx === activePreview ? 'var(--accent-neon-blue)' : 'rgba(255,255,255,0.25)',
                                                transition: 'all 0.4s ease'
                                            }} />
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', color: 'var(--accent-neon-blue)' }}>{app.name}</h3>
                                    <p style={{
                                        color: app.accent, fontSize: '0.8rem', letterSpacing: '1.5px',
                                        textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.8rem'
                                    }}>
                                        {app.tagline}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.55', marginBottom: '1.2rem' }}>
                                        {app.desc}
                                    </p>

                                    {/* Tech stack chips */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.2rem' }}>
                                        {app.techStack.map(tech => (
                                            <span key={tech} style={{
                                                fontSize: '0.7rem',
                                                padding: '4px 10px',
                                                background: 'rgba(0, 240, 255, 0.08)',
                                                border: '1px solid rgba(0, 240, 255, 0.25)',
                                                borderRadius: '3px',
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                                letterSpacing: '0.5px'
                                            }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{
                                        marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px',
                                        color: 'var(--text-secondary)', fontSize: '0.8rem',
                                        paddingTop: '1rem', borderTop: '1px dashed var(--glass-border)'
                                    }}>
                                        <Cpu size={16} />
                                        <span>Tap to view details &amp; screenshots</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {activeApp && (
                <div
                    onClick={() => setActiveApp(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000000,
                        backgroundColor: 'rgba(5, 6, 8, 0.98)', backdropFilter: 'blur(20px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2rem', cursor: 'pointer', pointerEvents: 'auto'
                    }}
                >
                    <button
                        onClick={() => setActiveApp(null)}
                        style={{
                            position: 'absolute', top: '2rem', right: '2rem',
                            background: 'transparent', border: 'none', color: 'var(--text-secondary)',
                            cursor: 'pointer', zIndex: 10
                        }}
                    >
                        <X size={40} />
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="mobile-app-modal"
                        style={{
                            width: '100%',
                            maxWidth: '1100px',
                            maxHeight: '90vh',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '2.5rem',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--accent-neon-blue)',
                            borderRadius: '12px',
                            padding: '2.5rem',
                            overflow: 'auto',
                            cursor: 'default',
                            boxShadow: '0 0 60px rgba(0, 240, 255, 0.25)'
                        }}
                    >
                        {/* Left: Carousel */}
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '260px',
                                height: '540px',
                                borderRadius: '40px',
                                background: '#0a0a0e',
                                border: '4px solid rgba(0, 240, 255, 0.5)',
                                boxShadow: `0 0 50px ${activeApp.accent}66, inset 0 0 30px rgba(0,0,0,0.8)`,
                                padding: '8px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '12px', left: '50%', transform: 'translateX(-50%)',
                                    width: '70px', height: '18px',
                                    background: '#000', borderRadius: '12px',
                                    zIndex: 5
                                }} />
                                <img
                                    src={activeApp.screenshots[slideIndex]}
                                    alt={`${activeApp.name} screen ${slideIndex + 1}`}
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '32px'
                                    }}
                                />
                            </div>

                            {/* Nav arrows */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
                                <button onClick={prevSlide} style={arrowBtnStyle}><ChevronLeft size={22} /></button>
                                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', letterSpacing: '2px', fontSize: '0.85rem' }}>
                                    {String(slideIndex + 1).padStart(2, '0')} / {String(activeApp.screenshots.length).padStart(2, '0')}
                                </span>
                                <button onClick={nextSlide} style={arrowBtnStyle}><ChevronRight size={22} /></button>
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ fontSize: '2.2rem', color: 'var(--accent-neon-blue)', marginBottom: '0.3rem' }}>
                                {activeApp.name}
                            </h2>
                            <p style={{
                                color: activeApp.accent, fontSize: '0.9rem', letterSpacing: '2px',
                                textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem'
                            }}>
                                {activeApp.tagline}
                            </p>
                            <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                {activeApp.desc}
                            </p>

                            <h4 style={{ color: 'var(--accent-neon-purple)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>
                                KEY FEATURES
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                {activeApp.features.map(f => (
                                    <li key={f} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                                        marginBottom: '0.6rem', color: 'var(--text-primary)', fontSize: '0.95rem'
                                    }}>
                                        <CheckCircle2 size={18} color={activeApp.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <h4 style={{ color: 'var(--accent-neon-purple)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>
                                TECH STACK
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                                {activeApp.techStack.map(tech => (
                                    <span key={tech} style={{
                                        fontSize: '0.78rem',
                                        padding: '6px 12px',
                                        background: 'rgba(0, 240, 255, 0.1)',
                                        border: '1px solid rgba(0, 240, 255, 0.3)',
                                        borderRadius: '3px',
                                        color: 'var(--accent-neon-blue)',
                                        fontWeight: 600
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex', gap: '0.8rem', marginTop: 'auto',
                                paddingTop: '1rem', borderTop: '1px dashed var(--glass-border)'
                            }}>
                                {activeApp.platforms.map(p => (
                                    <span key={p} style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600
                                    }}>
                                        {p === 'iOS' ? <Apple size={14} /> : <Smartphone size={14} />} {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .mobile-app-card:hover {
                    transform: translateY(-6px);
                }
                @media (max-width: 768px) {
                    .mobile-app-modal {
                        grid-template-columns: 1fr !important;
                        padding: 1.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

const arrowBtnStyle: React.CSSProperties = {
    width: '44px', height: '44px', borderRadius: '50%',
    background: 'rgba(0, 240, 255, 0.1)',
    border: '1px solid var(--accent-neon-blue)',
    color: 'var(--accent-neon-blue)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.25s ease'
};

export default MobileApps;
