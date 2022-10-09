import styles from "./App.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import React, { useContext, useState, useEffect } from "react";
import { DnsContext } from "./context/DnsContext";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Companylist from "./components/Companylist/Companylist";
import Signup from "./components/Signup/Signup.jsx";
import Companydetail from "./components/Companydetail/Companydetail";
import NFTlist from "./components/NFTlist/NFTlist";
import InvoicePage from "./components/invoiceUpload/InvoicePage";
import { useHttpClient } from "./components/hooks/http-hook.js";

function App() {
    const { connected, connectWallet, marketPlace, nft } =
        useContext(DnsContext);

    const [loadedCompanies, setLoadedCompanies] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const name = useParams.name;

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

    const chosenCompany = loadedCompanies?.filter((company) => {
        return company.name === name;
    });

    console.log("this is chosen company", chosenCompany);

    return (
        <BrowserRouter>
            <React.Fragment>
                <Navbar connected={connected} connectWallet={connectWallet} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/company-list"
                        element={
                            <Companylist loadedCompanies={loadedCompanies} />
                        }
                    />
                    <Route
                        path="/signup"
                        element={<Signup connected={connected} />}
                    />
                    <Route
                        path={"/:name"}
                        element={
                            <Companydetail
                                // connected={connected}
                                // name={chosenCompany.name}
                                // email={chosenCompany.email}
                                // location={chosenCompany.location}
                                // description={chosenCompany.description}
                                // image={chosenCompany.bannerImage}
                                // address={chosenCompany.address}
                                // contractAddress={chosenCompany.contractAddress}
                                loadedCompanies={loadedCompanies}
                            />
                        }
                    />
                    <Route
                        path="invoice-upload"
                        element={
                            <InvoicePage nft={nft} marketplace={marketPlace} />
                        }
                    />
                    {/* <Route path="/NFTlist" element={<NFTlist contractAddress={connected} marketPlace={marketPlace} nft={nft} />}/> */}
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    );
}
export default App;
