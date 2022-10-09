import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Mint from "../nftMinting/Mint";
import "./style.css";

export default function InvoicePage() {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsLoading(true);
        Tesseract.recognize(image, "eng", {
            logger: (m) => {
                console.log(m);
                if (m.status === "recognizing text") {
                    setProgress(parseInt(m.progress * 100));
                }
            },
        })
            .catch((err) => {
                console.error(err);
            })
            .then((result) => {
                console.log(result.data);
                setText(result.data.text);
                setIsLoading(false);

                // navigate("/");
            });
    };

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

    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="row row-cols-2 h-100">
                <div className="col-md-5 mx-auto h-30 d-flex flex-column justify-content-center">
                    {!isLoading && (
                        <h2 className="text-center py-5 mc-5">
                            Upload your invoice
                        </h2>
                    )}
                    {isLoading && (
                        <>
                            <progress
                                className="form-control"
                                value={progress}
                                max="100"
                            >
                                {progress}%{" "}
                            </progress>{" "}
                            <p className="text-center py-0 my-0">
                                Converting:- {progress} %
                            </p>
                        </>
                    )}
                    {!text && <div className="image-upload__preview ">
                        {previewUrl && <img src={previewUrl} alt="Preview" />}
                        {!previewUrl && <p>Please pick an image.</p>}
                    </div>}
                    {!isLoading && !text && (
                        <>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }
                                className="form-control mt-5 mb-2"
                            />
                            <input
                                type="button"
                                onClick={handleSubmit}
                                className="btn btn-primary mt-5"
                                value="Upload"
                            />
                        </>
                    )}
                    {!isLoading && text && (
                        <>
                            <textarea
                                className="form-control w-100 mt-5"
                                rows="30"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </>
                    )}
                </div>
                <div className="flex-column">
                    <Mint metaData={text} />
                </div>
            </div>
        </div>
    );
}
