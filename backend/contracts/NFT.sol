// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    //index starts at 0
    Counters.Counter private _tokenIds;

    uint public tokenCount = 0;
    address public organisation;
    constructor(string memory name, string memory symbol) ERC721(name, symbol){
        organisation = msg.sender;
    }
    function mint(string memory _tokenURI) external returns(uint newTokenId) {
        newTokenId = _tokenIds.current();
        tokenCount++;
        _safeMint(msg.sender, newTokenId);
        _tokenIds.increment();
        _setTokenURI(newTokenId, _tokenURI);
        // return(tokenCount);
    }
}