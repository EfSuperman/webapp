import React, { useState } from 'react';

/* ── tiny SVG logo components (28×28 default) ── */

const PhotoshopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#001E36"/>
    <text x="5" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#31A8FF">Ps</text>
  </svg>
);

const CanvaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#7D2CE0"/>
    <text x="7" y="21" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#fff">C</text>
  </svg>
);

const FigmaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="8" y="2" width="8" height="12" rx="4" fill="#F24E1E"/>
    <rect x="16" y="2" width="8" height="12" rx="4" fill="#FF7262"/>
    <rect x="8" y="14" width="8" height="12" rx="4" fill="#A259FF"/>
    <circle cx="20" cy="20" r="4" fill="#1ABCFE"/>
    <rect x="8" y="14" width="8" height="6" rx="0" fill="#0ACF83"/>
    <circle cx="16" cy="14" r="4" fill="#0ACF83"/>
  </svg>
);

const AiPlatformIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <path d="M10 22L16 8L22 22" stroke="#00ffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="12" r="2.5" fill="#b026ff"/>
    <line x1="12" y1="18" x2="20" y2="18" stroke="#00ffff" strokeWidth="1.5"/>
  </svg>
);

const CapCutIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#000"/>
    <text x="3" y="21" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff">CC</text>
  </svg>
);

const FilmoraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1B1F3B"/>
    <polygon points="12,8 24,16 12,24" fill="#00C9DB"/>
  </svg>
);

const AfterEffectsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#00005B"/>
    <text x="4" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#9999FF">Ae</text>
  </svg>
);

const PremiereProIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#00005B"/>
    <text x="5" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#9999FF">Pr</text>
  </svg>
);

const WondershareIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <text x="5" y="21" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#00D4AA">W</text>
  </svg>
);

const VideoAiIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <polygon points="10,8 24,16 10,24" fill="url(#vidGrad)"/>
    <defs><linearGradient id="vidGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#00ffff"/><stop offset="100%" stopColor="#b026ff"/>
    </linearGradient></defs>
  </svg>
);

const BlenderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <ellipse cx="18" cy="18" rx="8" ry="6" fill="#EA7600" opacity="0.9"/>
    <circle cx="18" cy="18" r="2.5" fill="#fff"/>
    <circle cx="18" cy="18" r="1" fill="#265787"/>
    <circle cx="10" cy="14" r="1.8" fill="#EA7600"/>
  </svg>
);

const MeshyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0d0d1a"/>
    <polygon points="16,6 26,24 6,24" fill="none" stroke="#00ffcc" strokeWidth="1.5"/>
    <polygon points="16,12 22,22 10,22" fill="none" stroke="#b026ff" strokeWidth="1"/>
    <circle cx="16" cy="17" r="2" fill="#00ffcc"/>
  </svg>
);

const Hyper3DIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0d0d1a"/>
    <text x="4" y="21" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#ff00ff">H3D</text>
  </svg>
);

const WebDevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <text x="2" y="13" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#00ffff">&lt;/&gt;</text>
    <rect x="6" y="16" width="20" height="12" rx="2" fill="none" stroke="#00ffff" strokeWidth="1.5"/>
    <line x1="6" y1="20" x2="26" y2="20" stroke="#00ffff" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const ReactIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#20232a"/>
    <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
    <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 16 16)"/>
    <circle cx="16" cy="16" r="2" fill="#61DAFB"/>
  </svg>
);

const HtmlCssJsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <text x="2" y="14" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#E44D26">H5</text>
    <text x="15" y="14" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#264DE4">CS</text>
    <text x="8" y="26" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#F7DF1E">JS</text>
  </svg>
);

const FlutterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#02569B"/>
    <polygon points="18,6 10,16 14,16 18,12" fill="#45D1FD" opacity="0.8"/>
    <polygon points="18,12 10,22 14,22 18,18" fill="#45D1FD"/>
    <polygon points="14,22 18,18 22,22 18,26" fill="#02569B" opacity="0.7"/>
  </svg>
);

const AppDevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <rect x="10" y="4" width="12" height="24" rx="3" fill="none" stroke="#b026ff" strokeWidth="1.8"/>
    <line x1="14" y1="25" x2="18" y2="25" stroke="#b026ff" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="14" y="8" width="4" height="3" rx="1" fill="#00ffff" opacity="0.6"/>
    <rect x="14" y="13" width="4" height="3" rx="1" fill="#00ffff" opacity="0.4"/>
  </svg>
);

const FirebaseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <polygon points="8,26 12,6 16,14 18,10 24,26" fill="#FFA000"/>
    <polygon points="8,26 16,20 24,26" fill="#FFCA28" opacity="0.8"/>
  </svg>
);

const CursorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#000"/>
    <path d="M10 6L22 16L16 17L19 26L16 27L13 18L10 22Z" fill="url(#cursorGrad)" stroke="#fff" strokeWidth="0.5"/>
    <defs><linearGradient id="cursorGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#00d4ff"/><stop offset="100%" stopColor="#7b61ff"/>
    </linearGradient></defs>
  </svg>
);

const ClaudeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a1a"/>
    <circle cx="16" cy="14" r="7" fill="#D97757"/>
    <circle cx="13" cy="13" r="1.2" fill="#fff"/>
    <circle cx="19" cy="13" r="1.2" fill="#fff"/>
    <path d="M13 17 Q16 20 19 17" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
);

const AntigravityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0a0a1a"/>
    <path d="M16 6L6 26H26L16 6Z" fill="none" stroke="url(#agGrad)" strokeWidth="1.8"/>
    <circle cx="16" cy="18" r="3" fill="url(#agGrad2)"/>
    <line x1="16" y1="10" x2="16" y2="14" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="agGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00ffff"/><stop offset="100%" stopColor="#b026ff"/>
      </linearGradient>
      <linearGradient id="agGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285F4"/><stop offset="100%" stopColor="#00ffff"/>
      </linearGradient>
    </defs>
  </svg>
);

const VSCodeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1e1e1e"/>
    <path d="M22 6L12 16L22 26V6Z" fill="#007ACC" opacity="0.8"/>
    <path d="M22 6L8 18L6 16L22 4V6Z" fill="#007ACC"/>
    <path d="M22 26L8 14L6 16L22 28V26Z" fill="#007ACC"/>
  </svg>
);

const McpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0d0d1a"/>
    <circle cx="16" cy="10" r="3" fill="none" stroke="#00ffcc" strokeWidth="1.5"/>
    <circle cx="8" cy="22" r="3" fill="none" stroke="#00ffcc" strokeWidth="1.5"/>
    <circle cx="24" cy="22" r="3" fill="none" stroke="#00ffcc" strokeWidth="1.5"/>
    <line x1="16" y1="13" x2="8" y2="19" stroke="#00ffcc" strokeWidth="1" opacity="0.6"/>
    <line x1="16" y1="13" x2="24" y2="19" stroke="#00ffcc" strokeWidth="1" opacity="0.6"/>
    <line x1="8" y1="22" x2="24" y2="22" stroke="#00ffcc" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const GeminiIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
    <path d="M16 4C16 4 8 14 8 20C8 24 12 28 16 28C20 28 24 24 24 20C24 14 16 4 16 4Z" fill="url(#gemGrad)" opacity="0.9"/>
    <defs><linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4285F4"/><stop offset="50%" stopColor="#9B72CB"/><stop offset="100%" stopColor="#D96570"/>
    </linearGradient></defs>
  </svg>
);

/* ── skill category data ── */

interface ToolItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  glowColor: string;
  tools: ToolItem[];
  expertise: string[];
}

const extraSkillsData: SkillCategory[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Designer',
    subtitle: 'Visual storytelling that captivates & converts',
    gradient: 'linear-gradient(135deg, #FF6B6B, #ee5a24)',
    glowColor: 'rgba(255,107,107,0.4)',
    tools: [
      { name: 'Photoshop', icon: <PhotoshopIcon /> },
      { name: 'Canva', icon: <CanvaIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'AI Platforms', icon: <AiPlatformIcon /> },
    ],
    expertise: ['Poster Design', 'Advertising', 'Game Graphics', 'Brand Identity', 'UI Mockups', 'Social Media Creatives'],
  },
  {
    id: 'video-editing',
    title: 'Video Editor',
    subtitle: 'Crafting cinematic experiences frame by frame',
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    glowColor: 'rgba(168,85,247,0.4)',
    tools: [
      { name: 'CapCut', icon: <CapCutIcon /> },
      { name: 'Filmora', icon: <FilmoraIcon /> },
      { name: 'Wondershare', icon: <WondershareIcon /> },
      { name: 'After Effects', icon: <AfterEffectsIcon /> },
      { name: 'Premiere Pro', icon: <PremiereProIcon /> },
      { name: 'AI Video Tools', icon: <VideoAiIcon /> },
    ],
    expertise: ['Game Cutscenes', 'Podcasts', 'Marketing Videos', 'Trailers', 'Motion Graphics', 'Reels & Shorts'],
  },
  {
    id: '3d-modeling',
    title: '3D Model Designer',
    subtitle: 'Bringing imagination into the third dimension',
    gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    glowColor: 'rgba(0,210,255,0.4)',
    tools: [
      { name: 'Blender', icon: <BlenderIcon /> },
      { name: 'Meshy AI', icon: <MeshyIcon /> },
      { name: 'Hyper 3D', icon: <Hyper3DIcon /> },
      { name: 'AI 3D Tools', icon: <AiPlatformIcon /> },
    ],
    expertise: ['Game Assets', 'Character Modeling', 'Environment Design', 'Props & Items', 'AI-Assisted Workflows'],
  },
  {
    id: 'web-dev',
    title: 'Web Developer & Designer',
    subtitle: 'Building pixel-perfect digital experiences',
    gradient: 'linear-gradient(135deg, #00ffcc, #00b894)',
    glowColor: 'rgba(0,255,204,0.4)',
    tools: [
      { name: 'React', icon: <ReactIcon /> },
      { name: 'HTML/CSS/JS', icon: <HtmlCssJsIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'Web Tools', icon: <WebDevIcon /> },
    ],
    expertise: ['Responsive Design', 'Landing Pages', 'Portfolio Sites', 'UI/UX Design', 'Modern Frameworks'],
  },
  {
    id: 'app-dev',
    title: 'App Developer & Designer',
    subtitle: 'Mobile-first solutions for every platform',
    gradient: 'linear-gradient(135deg, #ff00ff, #b026ff)',
    glowColor: 'rgba(176,38,255,0.4)',
    tools: [
      { name: 'Flutter', icon: <FlutterIcon /> },
      { name: 'React Native', icon: <ReactIcon /> },
      { name: 'Firebase', icon: <FirebaseIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'App Design', icon: <AppDevIcon /> },
    ],
    expertise: ['Cross-Platform Apps', 'UI/UX Design', 'Prototyping', 'App Store Publishing', 'Backend Integration'],
  },
  {
    id: 'ai-ide',
    title: 'AI-Powered IDE & Agents',
    subtitle: 'Supercharging dev workflows with intelligent AI',
    gradient: 'linear-gradient(135deg, #4285F4, #00ffcc)',
    glowColor: 'rgba(66,133,244,0.4)',
    tools: [
      { name: 'Cursor', icon: <CursorIcon /> },
      { name: 'Claude', icon: <ClaudeIcon /> },
      { name: 'Antigravity', icon: <AntigravityIcon /> },
      { name: 'VS Code', icon: <VSCodeIcon /> },
      { name: 'MCPs', icon: <McpIcon /> },
      { name: 'Gemini', icon: <GeminiIcon /> },
    ],
    expertise: ['AI Pair Programming', 'MCP Integrations', 'Prompt Engineering', 'Code Generation', 'AI Agents', 'Agentic Workflows'],
  },
];

/* ── main component ── */

const ExtraSkills = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="extra-skills"
      style={{
        padding: '100px 0 80px',
        borderTop: '1px solid var(--glass-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(176,38,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: 'var(--accent-neon-blue)',
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            ── More Than Just Code ──
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              marginBottom: '1rem',
            }}
          >
            Creative <span className="text-gradient">Multiverse</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: '1.7',
            }}
          >
            Beyond game development, I wield a diverse arsenal of creative tools — from pixels to polygons, frames to full-stack.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.8rem',
          }}
        >
          {extraSkillsData.map((category) => {
            const isHovered = hoveredCard === category.id;
            return (
              <div
                key={category.id}
                className="glass-panel"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '2rem 2rem 1.8rem',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered
                    ? `0 0 30px ${category.glowColor}, inset 0 0 20px ${category.glowColor.replace('0.4', '0.1')}`
                    : '0 4px 30px rgba(0,0,0,0.6)',
                  borderColor: isHovered ? category.glowColor.replace('0.4', '0.8') : 'var(--glass-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: category.gradient,
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'opacity 0.3s',
                  }}
                />

                {/* Card number badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '16px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isHovered ? category.gradient : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: '#fff',
                    transition: 'all 0.3s',
                    border: `1px solid ${isHovered ? 'transparent' : 'var(--glass-border)'}`,
                  }}
                >
                  0{extraSkillsData.indexOf(category) + 1}
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: '#fff',
                    marginBottom: '0.3rem',
                    letterSpacing: '1px',
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                  }}
                >
                  {category.subtitle}
                </p>

                {/* TOOLKIT */}
                <div style={{ marginBottom: '1.3rem' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: 'var(--accent-neon-blue)',
                      fontFamily: 'var(--font-display)',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    ▸ Toolkit
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {category.tools.map((tool, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)';
                          (e.currentTarget as HTMLDivElement).style.borderColor = category.glowColor.replace('0.4', '0.5');
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        }}
                      >
                        {tool.icon}
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EXPERTISE */}
                <div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: 'var(--accent-neon-blue)',
                      fontFamily: 'var(--font-display)',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    ▸ Expertise
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {category.expertise.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          background: `linear-gradient(135deg, ${category.glowColor.replace('0.4', '0.1')}, rgba(0,0,0,0))`,
                          border: `1px solid ${category.glowColor.replace('0.4', '0.25')}`,
                          color: 'var(--text-primary)',
                          padding: '5px 14px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtraSkills;
