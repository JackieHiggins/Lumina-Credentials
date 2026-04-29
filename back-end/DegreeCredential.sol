pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegreeCredential is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("UniversityDegree", "DEG")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://YOUR_FOLDER_CID_HERE/"; 
    }

    function issueDegree(address student) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(student, tokenId);
    }

    function revokeDegree(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function getStudentDegreeCount(address student) public view returns (uint256) {
        return balanceOf(student);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, integerToString(tokenId), ".json") : "";
    }

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