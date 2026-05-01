// Global navigation component rendered on every page for routing.

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.2rem 4rem', 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e3a8a', letterSpacing: '-0.5px' }}>
        ✨ Lumina <span style={{ color: '#3b82f6', fontWeight: '400' }}>Credentials</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500', fontSize: '1rem' }}>Home</Link>
        <Link href="/university" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500', fontSize: '1rem' }}>Admin Portal</Link>
        <Link href="/student" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500', fontSize: '1rem' }}>Student</Link>
        <Link href="/verify" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500', fontSize: '1rem' }}>Employer Verify</Link>
      </div>
    </nav>
  );
}