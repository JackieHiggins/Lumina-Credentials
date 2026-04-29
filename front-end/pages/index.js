/*
 * Page: Home
 * Purpose: Landing page for Lumina Credentials.
 */

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '6rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
        The Future of <span style={{ color: '#2563eb' }}>Academic Verification.</span>
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '3rem', lineHeight: '1.6' }}>
        Lumina leverages the BNB Smart Chain to issue permanent, tamper-proof academic credentials. 
        No central databases. No forged resumes. Just cryptographically secure proof of graduation.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link href="/university" style={{
          padding: '16px 32px', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none',
          borderRadius: '8px', fontWeight: '600', fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
        }}>
          University Login
        </Link>
        <Link href="/verify" style={{
          padding: '16px 32px', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none',
          borderRadius: '8px', fontWeight: '600', fontSize: '1.1rem', border: '1px solid #cbd5e1',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          Verify a Candidate
        </Link>
      </div>
    </main>
  );
}