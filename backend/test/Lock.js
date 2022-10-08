const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFT", function () {
    let owner;
    let otherAccount;
    let buyer;
    let NFT;
    let Market;
    let market;
    let URI = "sample URI";
    let nft;

    beforeEach(async function () {
        [owner, otherAccount, buyer] = await ethers.getSigners();

        NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.deploy("lumeel", "lml");
        Market = await ethers.getContractFactory("Marketplace");
        market = await Market.deploy();
    });
    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nft.organisation()).to.equal(owner.address);
            expect(await market._owner()).to.equal(owner.address);
        });
    });

    describe("Minting NFTs", function () {
        it("Should track each minted NFT", async function () {
            // addr1 mints an nft
            // const tokenId = await nft.connect(owner).mint(URI);
            // console.log(tokenId);
            // console.log(await nft.tokenCount().value);
            await nft.connect(owner).mint(URI);
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(owner.address)).to.equal(1);
            expect(await nft.tokenURI(0)).to.equal(URI);
        });
    });

    describe("Making marketplace items", function () {
        // it("Checking", async function () {
        //     let price = await market.priceFeed();
        //     console.log(price);
        // });
        beforeEach(async function () {
          // addr1 mints an nft
          await nft.connect(otherAccount).mint(URI)
          // owner approves marketplace to spend nft
          await nft.connect(otherAccount).setApprovalForAll(market.address, true)
        })

        it("Should track newly created item, transfer NFT from seller to marketplace", async function () {
          // owner offers their nft at a price of 1 ether
          await expect(market.connect(otherAccount).makeItem(nft.address, 0))
            .to.emit(market, "Offered")
            .withArgs(
              nft.address,
              0,
              otherAccount.address
            )
          // Owner of NFT should now be the marketplace
          expect(await nft.ownerOf(0)).to.equal(market.address);
          // Item count should now equal 1
          expect(await market.itemCount()).to.equal(1)
          // Get item from items mapping then check fields to ensure they are correct
          const item = await market.items(0)
          expect(item.nft).to.equal(nft.address)
          expect(item.tokenId).to.equal(0)
          expect(item.sold).to.equal(false)
        });

    });



    describe("Purchasing marketplace items", function () {
        beforeEach(async function () {
          // otherAccount mints an nft
          await nft.connect(otherAccount).mint(URI)
          // otherAccount approves marketplace to spend tokens
          await nft.connect(otherAccount).setApprovalForAll(market.address, true)
          // otherAccount makes their nft a marketplace item.
          await market.connect(otherAccount).makeItem(nft.address, 0)
        })

        it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async function () {
          const sellerInitalEthBal = await otherAccount.getBalance()
          const buyerInitialBal = await buyer.getBalance()

          // fetch item price from chainlink
        //   price = await market.priceFeed();
          // buyer purchases item.
          await expect(market.connect(buyer).purchaseItem(0, {value: 133240000000}))
          .to.emit(market, "Bought")
            .withArgs(
              nft.address,
              0,
              otherAccount.address,
              buyer.address
            )
          const sellerFinalEthBal = await otherAccount.getBalance()
          const buyerFinalEthBal = await buyer.getBalance()
          // Item should be marked as sold
          expect((await market.items(0)).sold).to.equal(true)
          console.log(sellerInitalEthBal)
          console.log(sellerFinalEthBal)
          console.log(buyerInitialBal)
          console.log(buyerFinalEthBal)
        //   expect(+parseEther(sellerFinalEthBal)).to.equal(+133240000000 + +parseEther(sellerInitalEthBal));
        //   expect(+buyerFinalEthBal).to.equal(+buyerInitialBal - +133240000000);
          // Seller should receive payment for the price of the NFT sold.
        //   expect(+fromWei(sellerFinalEthBal)).to.equal(+133240000000 + +fromWei(sellerInitalEthBal))
          // feeAccount should receive fee
        //   expect(+fromWei(buyerFinalEthBal)).to.equal(+133240000000 + +fromWei(buyerInitialBal))
          // The buyer should now own the nft
          expect(await nft.ownerOf(0)).to.equal(buyer.address);
        })
        // it("Should fail for invalid item ids, sold items and when not enough ether is paid", async function () {
        //   // fails for invalid item ids
        //   await expect(
        //     marketplace.connect(addr2).purchaseItem(2, {value: totalPriceInWei})
        //   ).to.be.revertedWith("item doesn't exist");
        //   await expect(
        //     marketplace.connect(addr2).purchaseItem(0, {value: totalPriceInWei})
        //   ).to.be.revertedWith("item doesn't exist");
        //   // Fails when not enough ether is paid with the transaction. 
        //   // In this instance, fails when buyer only sends enough ether to cover the price of the nft
        //   // not the additional market fee.
        //   await expect(
        //     marketplace.connect(addr2).purchaseItem(1, {value: toWei(price)})
        //   ).to.be.revertedWith("not enough ether to cover item price and market fee"); 
        //   // addr2 purchases item 1
        //   await marketplace.connect(addr2).purchaseItem(1, {value: totalPriceInWei})
        //   // addr3 tries purchasing item 1 after its been sold 
        //   const addr3 = addrs[0]
        //   await expect(
        //     marketplace.connect(addr3).purchaseItem(1, {value: totalPriceInWei})
        //   ).to.be.revertedWith("item already sold");
        });
});
