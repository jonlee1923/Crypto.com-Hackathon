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
    const nftContract = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

    const mint = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            await nftContract.mint();
        }catch(err){
            console.log(err);
        }
    }

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
                mint,
            }}
        >
            {children}
        </DnsContext.Provider>
    );
};
