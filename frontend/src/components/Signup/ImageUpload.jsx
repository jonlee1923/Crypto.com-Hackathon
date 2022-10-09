import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";

export default function ImageUpload(props) {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

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

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;

        // default javascript can get files property on the event target
        //if its a native file picker

        //check if theres one file
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true); //doesnt immediately change the value, only schedules it to change
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    //to use the input element without seeing it
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            {/* display: none to hide the input */}
            <input
                type="file"
                id={props.id}
                ref={filePickerRef}
                style={{ display: "none" }} //comment to see the difference
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>

                <button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
}
