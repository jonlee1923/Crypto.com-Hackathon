import React from "react";

import styles from "./Home.module.css";
import Button from "react-bootstrap/esm/Button";
import Card from "../Card/Card.jsx";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const environment = require("../../assets/environment.jpg");
  const pollution = require("../../assets/pollution.jpeg");
  const solution = require("../../assets/solution.jpg");
  const users = require("../../assets/users.jpg");
  const companies = require("../../assets/companies.jpg");

  const navigate = useNavigate();

  return (
    <div className={`${styles.home}`}>
      <section className={`${styles.captionsection}`}>
        <img
          src={environment}
          alt="environment"
          className={`${styles.environment}`}
        />
        <p className={`${styles.quote}`}>
          Reuse the past <br /> Recycle the Present <br />
          Save the Future
        </p>
        <Button className={`btn btn-primary btn-lg ${styles.differencebtn}`}>
          Make a difference now!
        </Button>
      </section>

      <section className={`${styles.challengesection}`}>
        <h1>Challenge:</h1>
        <Card>
          <h3>
            Our planet is{" "}
            <strong>
              <em>choking</em>
            </strong>{" "}
            on plastic <br />
            <br />
            Plastic waste pollution has hit a critical point
          </h3>
          <ul>
            <li>
              8 million pieces of plastic pollution find their way into our
              ocean daily.
            </li>
            <li>79% of plastic waste is sent to landfills or the ocean.</li>
            <li>while only 9% is recycled, and 12% gets incinerated.</li>
          </ul>
          <h3>We need to address plastic waste pollution globablly</h3>
          <p>
            The ultimate goal is to{" "}
            <strong>
              <em>globally reduce / get rid of plastic</em>
            </strong>{" "}
            as a whole by recovering existing plastic pollution.
          </p>
        </Card>

        <img
          src={pollution}
          alt="pollution"
          className={`${styles.pollutionimg}`}
        />
      </section>

      <section className={`${styles.solutionsection}`}>
        <h1>Solution:</h1>
        <img
          src={solution}
          alt="solution"
          className={`${styles.solutionimg}`}
        />

        <ul className={`${styles.solutionlist}`}>
          <Card>
            <li>
              <h3>
                <strong>
                  <em>Connecting</em>
                </strong>{" "}
                globally to fight plastic waste pollution{" "}
              </h3>
            </li>
            <li>
              <h3>
                <strong>
                  <em>Transparency</em>
                </strong>{" "}
                achieved by blockchain{" "}
              </h3>
            </li>
            <li>
              <h3>
                <strong>
                  <em>Verified</em>
                </strong>{" "}
                organisations leading recovery projects{" "}
              </h3>
            </li>
          </Card>
        </ul>
      </section>
      <section className={`${styles.signupsection}`}>
        <h1>Participation:</h1>
        <div className={`${styles.users}`}>
          <img src={users} alt="users" className={`${styles.usersimg}`} />

          <ul className={`${styles.userslist}`}>
            <Card>
              <h2>Contribute as a sponsor!</h2>
              <li>Choose the organisation that you wish to support.</li>
              <li>Share your impact on plastic recovery through NFTs!</li>
              <Button className={`btn btn-primary btn-lg ${styles.userbtn}`}>Become a sponsor!</Button>
            </Card>
          </ul>
        </div>
        <div className={`${styles.companies}`}>
          <img
            src={companies}
            alt="companies"
            className={`${styles.companiesimg}`}
          />

          <ul className={`${styles.companieslist}`}>
            <Card>
              <h3>Contributing as a project!</h3>
              <li>Reach out to the community for more financial support!</li>
              <li>Show the world the impact the organisation is making</li>
              <Button className={`btn btn-primary btn-lg ${styles.companiesbtn}`} onClick={()=>navigate("/signup")}>Join Lumeel!</Button>
            </Card>
          </ul>
        </div>
      </section>
    </div>
  );
}
