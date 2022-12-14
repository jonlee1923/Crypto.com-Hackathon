import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import styles from "./Companydetail.module.css";
import { ArrowDown } from "react-bootstrap-icons";
import { NavLink, useParams } from "react-router-dom";

const Companydetail = (props) => {
    const routerName = useParams().name;
    // console.log(routerName);
    const chosenCompany = props.loadedCompanies?.filter((company) => {
        return company.name === routerName;
    });
    console.log("this is chosen company", chosenCompany);

    const image = chosenCompany[0].bannerImage;

    const logo = require("../../assets/lumeel.jpg");
    const name = chosenCompany[0].name;
    const description = chosenCompany[0].description;
    const scrollRef = useRef();

    console.log("this is name", chosenCompany[0].name);
    const executeScroll = () => {
        scrollRef.current.scrollIntoView();
    };

    const [val, setVal] = useState(0);

    const [fiveClick, setFiveClick] = useState(false);
    const [tenClick, setTenClick] = useState(false);
    const [twoClick, setTwoClick] = useState(false);

    const colourFiveHandler = () => {
        setFiveClick(true);
        setTenClick(false);
        setTwoClick(false);
        setVal(0);
    };
    const colourTenHandler = () => {
        setFiveClick(false);
        setTenClick(true);
        setTwoClick(false);
        setVal(0);
    };
    const colourTwoHandler = () => {
        setFiveClick(false);
        setTenClick(false);
        setTwoClick(true);
        setVal(0);
    };

    return (
        <div className={`${styles.companydetail}`}>
            <section className={`${styles.backgroundimgsection}`}>
                <img
                    src={`http://localhost:5000/${image}`}
                    alt="image"
                    className={`${styles.bgimg}`}
                />
                <ArrowDown
                    onClick={executeScroll}
                    size={98}
                    className={`${styles.arrow}`}
                />
            </section>
            <div className={`${styles.cover}`}>
                <Card>
                    <section className={`${styles.sidebar}`}>
                        <img
                            src={logo}
                            alt="logo"
                            ref={scrollRef}
                            className={`${styles.logo}`}
                        />
                        <hr />
                        <p className={`${styles.name}`}>{name}</p>
                        <hr />
                        <p className={`${styles.description}`}>
                            About: <br />
                            {description}
                        </p>
                    </section>
                </Card>

                <div className={`${styles.rightbar}`}>
                    <section className={`${styles.maininfo}`}>
                    <NavLink to={'/NFTlist'}>
                        NFT Gallery
                    </NavLink>
                    </section>

                    <Card>
                        <section className={`${styles.donation}`}>
                            <h2>Support us!</h2>
                            <p className={`${styles.conversion}`}>$1=1kg</p>
                            <div className={`${styles.fixprice}`}>
                                <p
                                    onClick={colourFiveHandler}
                                    style={{
                                        borderColor: fiveClick
                                            ? "black"
                                            : "#ccc",
                                    }}
                                >
                                    $5
                                </p>
                                <p
                                    onClick={colourTenHandler}
                                    style={{
                                        borderColor: tenClick
                                            ? "black"
                                            : "#ccc",
                                    }}
                                >
                                    $50
                                </p>
                                <p
                                    onClick={colourTwoHandler}
                                    style={{
                                        borderColor: twoClick
                                            ? "black"
                                            : "#ccc",
                                    }}
                                >
                                    $200
                                </p>
                            </div>
                            <div className={`${styles.otheramounts}`}>
                                <span className={`${styles.currencycode}`}>
                                    $
                                </span>
                                <input
                                    type="text"
                                    placeholder="Other Amounts"
                                    className={`${styles.textcurrency}`}
                                    pattern="[0-9]*"
                                    value={val}
                                    onChange={(e) => {
                                        setVal((v) =>
                                            e.target.validity.valid
                                                ? e.target.value
                                                : v
                                        );
                                        setFiveClick(false);
                                        setTenClick(false);
                                        setTwoClick(false);
                                    }}
                                />
                            </div>
                            <div className={`${styles.total}`}>
                                {val === 0 ? null : (
                                    <p>Total Payment: ${val}</p>
                                )}
                                {fiveClick ? <p>Total Payment: $5 </p> : null}
                                {tenClick ? <p>Total Payment: $50 </p> : null}
                                {twoClick ? <p>Total Payment: $200 </p> : null}
                            </div>
                        </section>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Companydetail;
