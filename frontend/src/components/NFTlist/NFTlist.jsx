import React, { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import styles from "./NFTlist.module.css";
import Button from "react-bootstrap/esm/Button";
import { DnsContext } from "../../context/DnsContext";

const NFTlist = (props) => {
    const [loading, setLoading] = useState(true);
    const [loadedNfts, setLoadedNfts] = useState();
    const { connected, getNFTs } = useContext(DnsContext);

    const DUMMY_DATA = [
        {
            uri: "https://lumeel.infura-ipfs.io/ipfs/Qmd5HwTPDoDsSW9Wr6QGP3aGGxTQbkCPoo9FNqkW3z1s2P",
            name: "metal recycling"
        },
        {
            uri: "https://lumeel.infura-ipfs.io/ipfs/QmVB3kr6PPBoYfZVKM4ZDxKqnYLc6pMZYUuvpeHnrPCwAk",
            name: "plastic recycling"
        },
        {
            uri: "https://lumeel.infura-ipfs.io/ipfs/QmRHNNXPDJ2RUqkpM4CKMpLDcoKSZrU5VrDYLrztnmercr",
            name: "plastic recycling"
        }
    ];

    const loadNFTs = async () => {
        setLoading(true);
        // const nfts = await getNFTs(connected);
        // console.log("testing");
        // console.log(nfts);
        // setLoadedNfts(nfts);
        setLoading(false);
    };

    useEffect(() => {
        loadNFTs();
    }, []);

    return (
        <div>
            {loading && (
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )}

            {!loading && (
                <div className={`${styles.NFTlist}`}>
                    {DUMMY_DATA.map((nft) => (
                        <Card>
                            <div className={`${styles.NFTdiv}`}>
                                <img src={nft.uri} alt="testimg" />
                                <p>{nft.name}</p>
                                <p className={`${styles.conversion}`}>
                                    Price: USD $1
                                </p>
                                <Button
                                    className={`btn btn-primary btn-lg ${styles.buybtn}`} onClick={getNFTs}
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
