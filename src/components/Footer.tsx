import { personalInfo } from '../data/portfolioData';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-secondary)',
      padding: '6rem 0 3rem 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }} className="text-gradient">
          Get In Touch
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
          Whether you have a question, a project idea, or just want to say hi, feel free to drop a message. I'm always open to discussing new opportunities in game development!
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          
          <a href={`mailto:${personalInfo.contact.emails[0]}`} className="glass-panel glow-on-hover" style={{
            padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '1.2rem', color: '#fff'
          }}>
            <Mail size={24} color="var(--accent-neon-blue)" />
            {personalInfo.contact.emails[0]}
          </a>

          <a href={`tel:${personalInfo.contact.phone.replace(/\s+/g, '')}`} className="glass-panel glow-on-hover" style={{
            padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '1.2rem', color: '#fff'
          }}>
            <Phone size={24} color="var(--accent-neon-purple)" />
            {personalInfo.contact.phone}
          </a>

        </div>
        
        <div style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.95rem', 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '2rem', 
            borderTop: '1px solid var(--glass-border)', 
            paddingTop: '2rem' 
        }}>
          <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          <span>Crafted with React & Spline</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
