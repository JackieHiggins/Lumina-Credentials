pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Smart contract for issuing, revoking, and verifying academic degrees as NFTs.
contract DegreeCredential is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    // Initializes the contract with the token name, symbol, and initial owner.
    constructor(address initialOwner)
        ERC721("UniversityDegree", "DEG")
        Ownable(initialOwner)
    {}

    // Returns the base URI for computing the token URI. Replace placeholder with actual IPFS CID.
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeiauqmwerhhmetmtagxi32qcbci3tkmhovwdn5mvl5rhsisupfwpji/"; 
    }

    // Mints a new academic credential to the specified student address.
    function issueDegree(address student) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(student, tokenId);
    }

    // Burns a specific academic credential by its Token ID.
    function revokeDegree(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    // Returns the total number of valid degrees owned by a specific student address.
    function getStudentDegreeCount(address student) public view returns (uint256) {
        return balanceOf(student);
    }

    // Returns the Uniform Resource Identifier for a specific token by appending the .json extension.
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, integerToString(tokenId), ".json") : "";
    }

    // Converts a uint integer to a string representation.
    function integerToString(uint _value) public pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        uint temp = _value;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + _value % 10));
            _value /= 10;
        }
        return string(buffer);
    }
}