import React from "react";
import Card from "../Card/Card";
import { ArrowRight } from "react-bootstrap-icons";
import { NavLink, useParams } from "react-router-dom";

import styles from "./Companycard.module.css";

const Companycard = (props) => {
  return (
    <Card>
      <div className={`${styles.companycard}`}>
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="bgimg"
          className={`${styles.bgimg}`}
        />
        <div className={`${styles.bottomrow}`}>
          <p>{props.name}</p>
          <NavLink to={`/${props.name}`}>
            <ArrowRight className={`${styles.rightarrow}`} size={42} />
          </NavLink>
        </div>
      </div>
    </Card>
  );
};

export default Companycard;
