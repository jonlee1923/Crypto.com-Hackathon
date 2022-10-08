import React from "react";
import Card from "../Card/Card";
import styles from "./NFTlist.module.css";
import Button from "react-bootstrap/esm/Button";

const NFTlist = () => {
  const image = require("../../assets/pollution.jpeg");
  const image1 = require("../../assets/lumeel.jpg");

  return (
    <div className={`${styles.NFTlist}`}>
      <Card>
        <div className={`${styles.NFTdiv}`}>
          <img src={image} alt="testimg" />
            <p className={`${styles.conversion}`}>Price: USD $1</p>
            <Button className={`btn btn-primary btn-lg ${styles.buybtn}`}>
              Buy
            </Button>
        </div>
      </Card>

      <Card>
        <div className={`${styles.NFTdiv}`}>
          <img src={image} alt="testimg" />
          <p className={`${styles.conversion}`}>Price: USD $1</p>
          <Button className={`btn btn-primary btn-lg ${styles.buybtn}`}>
            Buy
          </Button>
        </div>
      </Card>
      <Card>
        <div className={`${styles.NFTdiv}`}>
          <img src={image} alt="testimg" />
          <Button className={`btn btn-primary btn-lg ${styles.buybtn}`}>
            Buy
          </Button>
        </div>
      </Card>
      <Card>
        <div className={`${styles.NFTdiv}`}>
          <img src={image} alt="testimg" />
          <Button className={`btn btn-primary btn-lg ${styles.buybtn}`}>
            Buy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NFTlist;
