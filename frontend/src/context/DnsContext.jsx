import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
export const DnsContext = React.createContext();

const { ethereum } = window;

export const DnsProvider = ({ children }) => {
    const [connected, setCurrentAccount] = useState("");

    // const [marketPlace, nft] = getContracts();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi.abi,
        signer
    );
    const nftContract = new ethers.Contract(
        NFTAddress.address,
        NFTAbi.abi,
        signer
    );

    //all nft functions

    const mint = async (uri) => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const tx = await nftContract.mint(uri);
            const txReceipt = await tx.wait(1);
            const tokenId = txReceipt.events[1].args.tokenId
            const uriCheck = txReceipt.events[1].args.uri;
            console.log(uriCheck);
            console.log(tokenId._hex);
            return tokenId;
        } catch (err) {
            console.log(err);
        }
    };

    const mintAndList = async (id) => {
        try {
            console.log(id);
            await nftContract.setApprovalForAll(
                MarketplaceAddress.address,
                true
            );
            await marketplaceContract.makeItem(NFTAddress.address, id);
        } catch (err) {}
    };

    //all marketplace functions
    const getNFTs = async (address) => {
        let listedNfts;
        const itemCount = await marketplaceContract.purchaseItem(1);
        const receipt = await itemCount.wait();
        const count = receipt.events[0].args.itemCount;
        console.log("number of items", count);

        console.log("for loop");
        for (let i = 1; i <= count._hex; i++) {
            const item = await marketplaceContract.items(i);
            console.log(item);
            if (!item.sold && item.seller.toLowerCase() === connected) {
                // get uri url from nft contract
                const uri = await nftContract.tokenURI(item.tokenId);

                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();
                console.log(metadata);

                let nft = {
                    itemId: i.itemId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                };

                listedNfts.push(nft);
            }
        }
        console.log(listedNfts);

        
    };

    //misc functions

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);

            // window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        console.log(connected);
    }, [connected]);

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <DnsContext.Provider
            value={{
                connectWallet,
                checkIfWalletIsConnected,
                connected,
                //NFT functions
                mint,
                mintAndList,
                //MarketPlace functions
                getNFTs,
            }}
        >
            {children}
        </DnsContext.Provider>
    );
};
