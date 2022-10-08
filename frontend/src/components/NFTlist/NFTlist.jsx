import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./NFTlist.module.css";
import Button from "react-bootstrap/esm/Button";

const NFTlist = (props) => {
    const [loading, setLoading] = useState(true);
    const [loadedNfts, setLoadedNfts] = useState();
    // const image = require("../../assets/pollution.jpeg");
    // const image1 = require("../../assets/lumeel.jpg");

    const loadNFTs = async () => {
        setLoading(true);
        const itemCount = await props.marketplace.itemCount();
        let nfts = [];

        for (let i = 1; i <= itemCount; i++) {
            let item = await props.marketplace.items(i);

            if (
                item.seller.toLowerCase() === props.contractAddress &&
                !item.sold
            ) {
                // get uri url from nft contract
                const uri = await props.nft.tokenURI(item.tokenId);

                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();

                let nft = {
                    name: metadata.name,
                    image: metadata.image,
                };

                nfts.push(nft);
            }
        }
        setLoading(false);
        setLoadedNfts(nfts);
    };

    useEffect(() => {
        loadNFTs();
    }, []);

    return (
        <div>
            {loading ? (
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            ) : (
                <div className={`${styles.NFTlist}`}>
                    {loadedNfts.map((nft) => (
                        <Card>
                            <div className={`${styles.NFTdiv}`}>
                                <img src={nft.image} alt="testimg" />
                                <p>{nft.name}</p>
                                <p className={`${styles.conversion}`}>
                                    Price: USD $1
                                </p>
                                <Button
                                    className={`btn btn-primary btn-lg ${styles.buybtn}`}
                                >
                                    Buy
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NFTlist;
