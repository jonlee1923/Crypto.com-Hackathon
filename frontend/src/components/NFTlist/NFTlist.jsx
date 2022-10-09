import React, { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import styles from "./NFTlist.module.css";
import Button from "react-bootstrap/esm/Button";
import { DnsContext } from "../../context/DnsContext";

const NFTlist = (props) => {
    const [loading, setLoading] = useState(true);
    const [loadedNfts, setLoadedNfts] = useState();
    const { connected, getNFTs } = useContext(DnsContext);

    const loadNFTs = async () => {
        setLoading(true);
        const nfts = await getNFTs(connected);
        setLoadedNfts(nfts);
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

            {!loading && loadedNfts && (
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
