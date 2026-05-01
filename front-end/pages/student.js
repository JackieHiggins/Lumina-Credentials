// Allows students to connect their wallet to check their verified academic credentials.

import { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0xAfc343Ea50F981d57E35139E4E84A873d6cDd481"; 
const ABI = [
  "function getStudentDegreeCount(address student) public view returns (uint256)"
];

export default function StudentPortal() {
  const [degreeCount, setDegreeCount] = useState(null);
  const [status, setStatus] = useState("");
  const [studentAddress, setStudentAddress] = useState("");

  // Connects to MetaMask and queries the contract for the user's degree count.
  async function checkMyDegrees() {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
      setStatus("Connecting to your wallet...");
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const currentAccount = accounts[0];
      setStudentAddress(currentAccount); 

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      setStatus("Searching the blockchain for your records...");
      const count = await contract.getStudentDegreeCount(currentAccount);
      
      setDegreeCount(count.toNumber());
      setStatus(""); 
    } catch (err) {
      console.error(err);
      setStatus("Error: Could not check degrees. Ensure you are on the BNB Testnet.");
    }
  }

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '1rem', fontSize: '2.5rem' }}>My Credentials</h2>
      <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
        Connect your wallet to view your cryptographically verified academic records.
      </p>
      
      <div className="card">
        <button onClick={checkMyDegrees} className="btn-primary">
          Connect Wallet & View Records
        </button>

        {status && <p style={{ marginTop: '20px', color: '#64748b' }}><em>{status}</em></p>}

        {degreeCount !== null && (
          <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', textAlign: 'left' }}>
            <h3 style={{ marginTop: '0', color: '#1e293b' }}>Welcome, Graduate!</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', wordBreak: 'break-all' }}><strong>Wallet:</strong> <span className="blockchain-address">{studentAddress}</span></p>
            <p style={{ fontSize: '1.1rem' }}><strong>Valid Degrees Owned:</strong> {degreeCount}</p>
            
            {degreeCount > 0 ? (
              <div style={{ padding: '10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: '600', textAlign: 'center', marginTop: '15px' }}>
                🎉 Congratulations! Your credentials are verified.
              </div>
            ) : (
              <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontWeight: '600', textAlign: 'center', marginTop: '15px' }}>
                No academic records found for this wallet.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}