import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { DnsContext } from "../../context/DnsContext";
import styles from "./Signup.module.css";
import Input from "./Input";
import ImageUpload from "./ImageUpload";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
} from "../utils/validators";

export default function Signup(props) {
    const navigate = useNavigate();
    const { connected, connectWallet } = useContext(DnsContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
            // logoImage: {
            //     value: null,
            //     isValid: false,
            // },
            bannerImage: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(props.connected);
        console.log("submitted");
        try {
            const formData = new FormData();
            console.log(formState.inputs.name.value);
            console.log(formState.inputs.email.value);
            console.log(formState.inputs.description.value);
            console.log(formState.inputs.address.value);
            console.log(formState.inputs.bannerImage.value);

            formData.append("contractAddress", props.connected);
            formData.append("name", formState.inputs.name.value);
            formData.append("email", formState.inputs.email.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            // formData.append("logoImage", formState.inputs.logoImage.value);
            formData.append("bannerImage", formState.inputs.bannerImage.value);

            console.log("checking");
            console.log(formData);
            await sendRequest(
                "http://localhost:5000/api/organisations/",
                "POST",
                formData
            );

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            {/* <ErrorModal error={error} onClear={clearError} /> */}
            <form className="place-form" onSubmit={submitHandler}>
                {/* {isLoading && <LoadingSpinner asOverlay />} */}
                <Input
                    id="email"
                    element="input"
                    type="text"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter an email."
                    onInput={inputHandler}
                />
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Organisation Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                {/* <ImageUpload
                    id="logoImage"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                /> */}
                <ImageUpload
                    id="bannerImage"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                />
                <button
                    className=""
                    type="submit"
                    disabled={!formState.isValid && !props.connected}
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    );
}
