
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
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Employer Verification Portal</h2>

      <div style={{ marginBottom: '2rem', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>1. Verify Student Wallet</h3>
        <form onSubmit={handleVerifyCount}>
          <input 
            type="text" 
            placeholder="Candidate Address (0x...)" 
            value={addressToCheck}
            onChange={(e) => setAddressToCheck(e.target.value)}
            style={{ padding: '10px', width: '350px' }}
            required
          />
          <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px', cursor: 'pointer' }}>
            Check Total Degrees
          </button>
        </form>
        
        {degreeCount !== null && (
          <div style={{ marginTop: '15px', padding: '10px', background: degreeCount > 0 ? '#e6f4ea' : '#fce8e6' }}>
            <strong>Found:</strong> {degreeCount} degree(s) 
            {degreeCount > 0 ? " ✓ VERIFIED" : " ✕ NOT FOUND"}
          </div>
        )}
      </div>

      <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>2. View Degree Data (Metadata URI)</h3>
        <form onSubmit={handleVerifyURI}>
          <input 
            type="number" 
            placeholder="Token ID (e.g., 0)" 
            value={tokenIdToCheck}
            onChange={(e) => setTokenIdToCheck(e.target.value)}
            style={{ padding: '10px', width: '350px' }}
            required
            min="0"
          />
          <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px', cursor: 'pointer' }}>
            Fetch File Location
          </button>
        </form>

        {fetchedURI && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#e3f2fd' }}>
            <strong>Decentralized Storage Link:</strong> <br/>
            <a href={fetchedURI.replace("ipfs://", "https://ipfs.io/ipfs/")} target="_blank" rel="noreferrer">{fetchedURI}</a>
          </div>
        )}
      </div>

      {status && <p style={{ marginTop: '20px' }}><em>{status}</em></p>}
    </main>
  );
}