import React, { useState, useEffect } from "react";
import Companydetail from "../Companydetail/Companydetail";
import { useHttpClient } from "../hooks/http-hook";

import styles from "./Companylist.module.css";

export default function Companylist() {
    const [loadedCompanies, setLoadedCompanies] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        console.log("hi");

        const fetchCompanies = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/organisations/"
                );

                setLoadedCompanies(responseData.organisations);
            } catch (err) {
                console.log(err);
            }
        };

        console.log("checking");
        fetchCompanies();
        console.log(loadedCompanies);
    }, [sendRequest]);

    return (
        <div>
            {isLoading && !loadedCompanies ? (
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            ) : (
                loadedCompanies.map((company) => (
                    <Companydetail
                        image={company.image}
                        name={company.name}
                        description={company.description}
                        address={company.address}
                        location={company.coordinates}
                    />
                ))
            )}
        </div>
    );
}
