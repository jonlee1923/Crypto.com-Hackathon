import { useState } from "react";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { Row, Form, Button } from "react-bootstrap";
// const ipfsClient = require("ipfs-http-client");
import { create } from 'ipfs-http-client'


const Mint = (props) => {

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const projectId = "2FsiKT4NWorSiPJaFVz18VWAcDp";
    const projectSecret = "38aa6b9d61db072a54b994c217f797b3";
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

    const uploadToIPFS = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (typeof file !== "undefined") {
            try {
                const result = await client.add(file);
                console.log("result from upload to ipfs");
                console.log(result);
                setImage(`https://lumeel.infura-ipfs.io/ipfs/${result.path}`);
            } catch (error) {
                console.log("ipfs image upload error: ", error);
            }
        }
    };

    const mintThenList = async (result) => {
        const uri = `https://lumeel.infura-ipfs.io/ipfs/${result.path}`;
        // mint nft
        await (await props.nft.mint(uri)).wait();

        // get tokenId of new nft
        const id = await props.nft.tokenCount();

        // approve marketplace to spend nft
        await (
            await props.nft.setApprovalForAll(props.marketplace.address, true)
        ).wait();
        await (await props.marketplace.makeItem(props.nft.address, id)).wait();
    };

    const createNFT = async () => {
        if (!image || !name) return;
        try {
            console.log("image value");
            console.log(image);
            const result = await client.add(JSON.stringify({ image, name }));
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

// return (
//     <div className="container-fluid mt-5">
//         <div className="row">
//             <main
//                 role="main"
//                 className="col-lg-12 mx-auto"
//                 style={{ maxWidth: "1000px" }}
//             >
//                 <div className="content mx-auto">
//                     <div className=" mx-auto h-50 d-flex flex-column justify-content-center">
//                         <h2 className="text-center py-5 mc-5">
//                             Upload the image for your NFT
//                         </h2>
//                         <input
//                             type="file"
//                             onChange={(e) =>
//                                 setImage(
//                                     URL.createObjectURL(e.target.files[0])
//                                 )
//                             }
//                             className="form-control mt-5 mb-2"
//                         />
//                         <input
//                             type="text"
//                             onChange={(e) => setName(e.target.value)}
//                             size="lg"
//                             required
//                             placeholder="Name"
//                         />
//                         <input
//                             type="button"
//                             onClick={}
//                             className="btn btn-primary mt-5"
//                             value="Upload"
//                         />
//                         {/* <Form.Control
//                             onChange={(e) => setName(e.target.value)}
//                             size="lg"
//                             required
//                             type="text"
//                             placeholder="Name"
//                         />
//                         <Form.Control
//                             onChange={(e) => setDescription(e.target.value)}
//                             size="lg"
//                             required
//                             as="textarea"
//                             placeholder="Description"
//                         />
//                         <div className="d-grid px-0">
//                             <Button
//                                 onClick={createNFT}
//                                 variant="primary"
//                                 size="lg"
//                             >
//                                 Create & List NFT!
//                             </Button>
//                         </div> */}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     </div>
// );
