// Public dashboard for employers to verify a candidate's degrees or fetch degree metadata.

import { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0xAfc343Ea50F981d57E35139E4E84A873d6cDd481"; 

const ABI = [
  "function getStudentDegreeCount(address student) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

export default function VerifyPortal() {
  const [addressToCheck, setAddressToCheck] = useState("");
  const [degreeCount, setDegreeCount] = useState(null);
  
  const [tokenIdToCheck, setTokenIdToCheck] = useState("");
  const [fetchedURI, setFetchedURI] = useState("");
  
  const [status, setStatus] = useState("");

  // Queries the blockchain for the total number of degrees held by a candidate.
  async function handleVerifyCount(e) {
    e.preventDefault();
    if (!window.ethereum) return alert("Please install MetaMask!");

    try {
      setStatus("Querying blockchain for address...");
      setDegreeCount(null);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      const count = await contract.getStudentDegreeCount(addressToCheck);
      setDegreeCount(count.toNumber());
      setStatus(""); 
    } catch (err) {
      console.error(err);
      setStatus("Error fetching degree count.");
    }
  }

  // Queries the blockchain for a specific Token ID to retrieve its metadata link.
  async function handleVerifyURI(e) {
    e.preventDefault();
    if (!window.ethereum) return alert("Please install MetaMask!");

    try {
      setStatus("Querying blockchain for Token ID...");
      setFetchedURI("");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      const uri = await contract.tokenURI(parseInt(tokenIdToCheck));
      setFetchedURI(uri);
      setStatus(""); 
    } catch (err) {
      console.error(err);
      setStatus("Error: Token might not exist or has been revoked.");
    }
  }

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '2rem', fontSize: '2rem' }}>Employer Verification Portal</h2>

      <div className="card">
        <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>1. Verify Student Wallet</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>Check how many valid credentials a candidate holds.</p>
        <form onSubmit={handleVerifyCount}>
          <input 
            type="text" 
            placeholder="Candidate Address (0x...)" 
            value={addressToCheck}
            onChange={(e) => setAddressToCheck(e.target.value)}
            className="input-field"
            style={{ width: 'auto', display: 'inline-block', minWidth: '350px' }}
            required
          />
          <button type="submit" className="btn-secondary" style={{ marginLeft: '10px', marginTop: '0' }}>
            Check Degrees
          </button>
        </form>
        
        {degreeCount !== null && (
          <div style={{ marginTop: '15px', padding: '10px', background: degreeCount > 0 ? '#dcfce7' : '#fee2e2', color: degreeCount > 0 ? '#166534' : '#991b1b', borderRadius: '6px', fontWeight: '600' }}>
            <strong>Found:</strong> {degreeCount} degree(s) 
            {degreeCount > 0 ? " ✓ VERIFIED" : " ✕ NOT FOUND"}
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>2. View Degree Data (Metadata URI)</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>Fetch the secure IPFS file link for a specific token ID.</p>
        <form onSubmit={handleVerifyURI}>
          <input 
            type="number" 
            placeholder="Token ID (e.g., 0)" 
            value={tokenIdToCheck}
            onChange={(e) => setTokenIdToCheck(e.target.value)}
            className="input-field"
            style={{ width: 'auto', display: 'inline-block', minWidth: '350px' }}
            required
            min="0"
          />
          <button type="submit" className="btn-secondary" style={{ marginLeft: '10px', marginTop: '0' }}>
            Fetch Link
          </button>
        </form>

        {fetchedURI && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', wordBreak: 'break-all' }}>
            <strong>Decentralized Storage Link:</strong> <br/>
            <a href={fetchedURI.replace("ipfs://", "https://ipfs.io/ipfs/")} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{fetchedURI}</a>
          </div>
        )}
      </div>

      {status && (
        <div style={{ padding: '16px', backgroundColor: '#e0e7ff', color: '#3730a3', borderRadius: '8px', border: '1px solid #c7d2fe', fontWeight: '500' }}>
          {status}
        </div>
      )}
    </main>
  );
}