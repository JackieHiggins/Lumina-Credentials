
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

  const cardStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' };
  const buttonStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)' };

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '1rem', fontSize: '2.5rem' }}>My Credentials</h2>
      <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
        Connect your wallet to view your cryptographically verified academic records.
      </p>
      
      <div style={cardStyle}>
        <button onClick={checkMyDegrees} style={buttonStyle}>
          Connect Wallet & View Records
        </button>

        {status && <p style={{ marginTop: '20px', color: '#64748b' }}><em>{status}</em></p>}

        {degreeCount !== null && (
          <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', textAlign: 'left' }}>
            <h3 style={{ marginTop: '0', color: '#1e293b' }}>Welcome, Graduate!</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', wordBreak: 'break-all' }}><strong>Wallet:</strong> {studentAddress}</p>
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