import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { Row, Form, Button } from "react-bootstrap";
import { create } from "ipfs-http-client";
import { DnsContext } from "../../context/DnsContext";
import { useNavigate } from "react-router-dom";

const Mint = (props) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const navigate = useNavigate();

    const {
        connectWallet,
        checkIfWalletIsConnected,
        connected,
        mint,
        mintAndList,
    } = useContext(DnsContext);

    const projectId = process.env.proj_id;
    const projectSecret = process.env.secret_key;
    const auth =
        "Basic " +
        Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });
    useEffect(() => {
        //this function generates the preview

        if (!file) {
            return;
        }

        //generate url with a api built into the browser
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const uploadToIPFS = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFile(file);
        if (typeof file !== "undefined") {
            try {
                const result = await client.add(file);
                setImage(`https://lumeel.infura-ipfs.io/ipfs/${result.path}`);
            } catch (error) {
                console.log("ipfs image upload error: ", error);
            }
        }
    };

    const mintThenList = async (result) => {
        const uri = `https://lumeel.infura-ipfs.io/ipfs/${result.path}`;
        // mint nft
        // await (await props.nft.mint(uri)).wait();
        const tokenId = await mint(uri);
        // approve marketplace to spend nft
        await mintAndList(tokenId);
        navigate("/");
    };

    const createNFT = async () => {
        if (!image || !name || !props.metaData) return;
        try {
            const text = props.metaData;
            console.log("image value");
            console.log(image);
            const result = await client.add(
                JSON.stringify({ image, name, text })
            );
            mintThenList(result);
        } catch (error) {
            console.log("ipfs uri upload error: ", error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main
                    role="main"
                    className="col-lg-12 mx-auto"
                    style={{ maxWidth: "1000px" }}
                >
                    <div className="content mx-auto">
                        <Row className="g-4">
                            <h2 className="text-center py-5 mc-5">
                                Upload the image for your NFT
                            </h2>
                            <div className="image-upload__preview ">
                                {previewUrl && (
                                    <img src={previewUrl} alt="Preview" />
                                )}
                                {!previewUrl && <p>Please pick an image.</p>}
                            </div>
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                onChange={uploadToIPFS}
                            />
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                size="lg"
                                required
                                type="text"
                                placeholder="Name"
                            />
                            <div className="d-grid px-0">
                                <Button
                                    onClick={createNFT}
                                    variant="primary"
                                    size="lg"
                                    disabled={!props.metaData}
                                >
                                    Create & List NFT!
                                </Button>
                            </div>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Mint;
