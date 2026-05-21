import { useState, useEffect } from 'react';
import { phaserGamesData } from '../data/portfolioData';
import { Gamepad2, X, Play, Monitor, Smartphone, RefreshCw } from 'lucide-react';

const PhaserGames = () => {
    const [activeGame, setActiveGame] = useState<typeof phaserGamesData[0] | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveGame(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleRetry = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <section id="phaser-games" style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                    PLAY SECTION <span className="text-gradient">POWERED BY PHASER</span>
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
                    Interactive games built with Phaser.js. Click any card to play live in your browser.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2.5rem',
                }}>
                    {phaserGamesData.map((game) => {
                        const isPortrait = game.layoutType === 'portrait';

                        return (
                            <div
                                key={game.id}
                                className="glass-panel glow-on-hover"
                                onClick={() => {
                                    setActiveGame(game);
                                    setRefreshKey(0);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    height: '100%',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                {/* Thumbnail Container */}
                                <div style={{
                                    height: '220px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundColor: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid var(--glass-border)'
                                }}>
                                    <iframe 
                                        src={`${game.gamePath}&mode=preview`}
                                        title={game.name}
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            border: 'none', 
                                            pointerEvents: 'none',
                                            transform: 'scale(1.05)',
                                            opacity: 1, // Removed dull effect
                                            transition: '0.3s'
                                        }}
                                        className="game-preview-frame"
                                    />
                                    
                                    {/* Play Button Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                                        opacity: 0,
                                        transition: '0.3s',
                                    }} className="play-overlay">
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'var(--accent-neon-blue)',
                                            color: '#000',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 0 20px var(--accent-neon-blue)'
                                        }}>
                                            <Play fill="currentColor" size={24} />
                                        </div>
                                    </div>

                                    {/* Platform Badge */}
                                    <div style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        background: 'rgba(10, 10, 15, 0.8)', padding: '4px 10px',
                                        borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px',
                                        fontSize: '0.7rem', border: '1px solid var(--glass-border)'
                                    }}>
                                        {isPortrait ? <Smartphone size={12} /> : <Monitor size={12} />}
                                        {isPortrait ? 'MOBILE' : 'DESKTOP'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-neon-blue)' }}>{game.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                                        {game.desc}
                                    </p>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                        <Gamepad2 size={16} />
                                        <span>Phaser Engine</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Live Player Modal */}
            {activeGame && (
                <div
                    onClick={() => setActiveGame(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000000,
                        backgroundColor: 'rgba(5, 6, 8, 0.98)', backdropFilter: 'blur(20px)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem', cursor: 'pointer',
                        pointerEvents: 'auto'
                    }}
                >
                    <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleRetry(); }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)', border: '1px solid var(--glass-border)', 
                                color: '#fff', padding: '10px 20px', borderRadius: '8px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                fontWeight: 600, transition: '0.3s'
                            }}
                            className="glow-on-hover"
                        >
                            <RefreshCw size={20} className={refreshKey > 0 ? 'animate-spin' : ''} /> RETRY
                        </button>
                        <button
                            onClick={() => setActiveGame(null)}
                            style={{
                                background: 'transparent', border: 'none', color: 'var(--text-secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={40} />
                        </button>
                    </div>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: activeGame.layoutType === 'portrait' ? 'auto' : '90%',
                            maxWidth: activeGame.layoutType === 'portrait' ? '450px' : '1000px',
                            height: activeGame.layoutType === 'portrait' ? '80vh' : '70vh',
                            aspectRatio: activeGame.layoutType === 'portrait' ? '9/16' : '16/9',
                            backgroundColor: '#000',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid var(--accent-neon-blue)',
                            boxShadow: '0 0 50px rgba(0, 240, 255, 0.2)',
                            position: 'relative'
                        }}
                    >
                        <iframe
                            key={refreshKey}
                            src={`${activeGame.gamePath}&ref=${refreshKey}`}
                            title={activeGame.name}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allow="autoplay; gamepad"
                        />
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem' }}>{activeGame.name}</h2>
                        <p style={{ color: 'var(--accent-neon-blue)', letterSpacing: '2px', fontWeight: 600 }}>LIVE PLAYABLE MODE</p>
                    </div>
                </div>
            )}

            <style>{`
                .play-overlay {
                    opacity: 0;
                }
                .glass-panel:hover .play-overlay {
                    opacity: 1;
                }
                .glass-panel:hover .game-preview-frame {
                    transform: scale(1.1);
                    opacity: 1;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default PhaserGames;
