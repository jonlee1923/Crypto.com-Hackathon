import React, { useState, useEffect } from "react";
import Companydetail from "../Companydetail/Companydetail";
import { useHttpClient } from "../hooks/http-hook";

import styles from "./Companylist.module.css";

export default function Companylist() {
    const [loadedCompanies, setLoadedCompanies] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {

        const fetchCompanies = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/organisations/"
                );

                setLoadedCompanies(responseData.organisations);

                console.log("checking image");
                console.log(loadedCompanies);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCompanies();
    }, [sendRequest]);

    return (
        <div>
            {isLoading && (
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )}
            {!isLoading &&
                loadedCompanies &&
                loadedCompanies.map((company) => (
                    <Companydetail
                        image={company.bannerImage}
                        name={company.name}
                        description={company.description}
                        address={company.address}
                        location={company.coordinates}
                    />
                ))}
        </div>
    );
}
