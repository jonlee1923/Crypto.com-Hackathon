// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Marketplace is ReentrancyGuard {
    //Chainlink usd-eth pricefeed
    // AggregatorV3Interface internal ref =
    //     AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);

    // Variables
    // address payable public immutable feeAccount; // the account that receives fees
    // uint public immutable feePercent; // the fee percentage on sales
    uint public itemCount = 0;
    address public _owner;

    struct Item {
        uint itemCount;
        IERC721 nft;
        uint tokenId;
        address payable seller;
        bool sold;
    }

    

    // nft marketplace
    mapping(uint => Item) public items;

    event Offered(address indexed nft, uint tokenId, address indexed seller);
    event Bought(
        address indexed nft,
        uint tokenId,
        address indexed seller,
        address indexed buyer
    );

    constructor() {
        _owner = msg.sender;
    }

    // function priceFeed() public view returns (int) {
    //     (
    //         /*uint80 roundID*/,
    //         int price,
    //         /*uint startedAt*/,
    //         /*uint timeStamp*/,
    //         /*uint80 answeredInRound*/
    //     ) = ref.latestRoundData();
    //     // console.log(price);
    //     return price;
    // }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId) external nonReentrant {
        itemCount++; // increment itemCount
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[_tokenId] = Item(itemCount, _nft, _tokenId, payable(msg.sender), false);
        // emit Offered event
        emit Offered(address(_nft), _tokenId, msg.sender);
    }
    
    function purchaseItem(uint _tokenId) external payable nonReentrant {
        // uint price = uint(priceFeed());        
        Item storage item = items[_tokenId];
        require(item.itemCount != 0, "item doesn't exist");
        require(!item.sold, "item already sold");
        require(msg.value >= 133240000000, "insufficient value");

        // pay seller and feeAccount
        item.seller.transfer(133240000000);

        item.sold = true;

        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(address(item.nft), item.tokenId, item.seller, msg.sender);
    }


    function donation(address _to) external payable {
        require(msg.value > 0, "please enter a valid amount");
        address payable to = payable(_to);
        to.transfer(msg.value);
    }

    // function getUris(address organisation) external view {
    //     string[] uris = 
        
    //     for (uint i = 0; i < itemCount; i++){
    //         if(items[i].seller == organisation){

    //         }
    //     }
    // }
}
