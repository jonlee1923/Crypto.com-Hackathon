import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import styles from "./Companydetail.module.css";
import { ArrowDown } from "react-bootstrap-icons";

const Companydetail = () => {
  const image = require("../../assets/pollution.jpeg");
  const logo = require("../../assets/lumeel.jpg");

  const scrollRef = useRef();
  const name = "Lumeel.ltd";
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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
        <img src={image} alt="image" className={`${styles.bgimg}`} />
        <ArrowDown
          onClick={executeScroll}
          size={98}
          className={`${styles.arrow}`}
        />
      </section>
      <div className={`${styles.cover}`}>
        <section className={`${styles.sidebar}`}>
          <Card>
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
          </Card>
        </section>
        <div className={`${styles.rightbar}`}>
          <section className={`${styles.maininfo}`}>
            <p>MAP</p>
          </section>
          <section className={`${styles.donation}`}>
            <Card>
              <h3>Support us!</h3>
              <div className={`${styles.conversion}`}>
                <p>$1=1kg</p>
              </div>
              <div className={`${styles.fixprice}`}>
                <p
                  onClick={colourFiveHandler}
                  style={{ borderColor: fiveClick ? "black" : "#ccc" }}
                >
                  $5
                </p>
                <p
                  onClick={colourTenHandler}
                  style={{ borderColor: tenClick ? "black" : "#ccc" }}
                >
                  $50
                </p>
                <p
                  onClick={colourTwoHandler}
                  style={{ borderColor: twoClick ? "black" : "#ccc" }}
                >
                  $200
                </p>
              </div>
              <div className={`${styles.otheramounts}`}>
                <span className={`${styles.currencycode}`}>$</span>
                <input
                  type="text"
                  placeholder="Other Amounts"
                  className={`${styles.textcurrency}`}
                  pattern="[0-9]*"
                  value={val}
                  onChange={(e) => {
                    setVal((v) =>
                      e.target.validity.valid ? e.target.value : v
                    );
                    setFiveClick(false);
                    setTenClick(false);
                    setTwoClick(false);
                  }}
                />
              </div>
              <div className={`${styles.total}`}>
                {val === 0 ? null : <p>Total Payment: ${val}</p>}
                {fiveClick ? <p>Total Payment: $5 </p> : null}
                {tenClick ? <p>Total Payment: $50 </p> : null}
                {twoClick ? <p>Total Payment: $200 </p> : null}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Companydetail;
