import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Navbar.module.css";

const Navbar2 = (props) => {
  // const { connectWallet, checkIfWalletIsConnected, connected } = useContext(DnsContext);
  const lumeel = require("../../assets/lumeel.jpg");

  // useEffect(() => {
  //     checkIfWalletIsConnected();
  // }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={lumeel} alt="logo pic" className={`${styles.brand}`} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link className={` ${styles.companylist}`} href="/invoice-upload">Mint your NFT</Nav.Link>
            <Nav.Link className={` ${styles.companylist}`} href="/company-list">List of Companies</Nav.Link>
            <Form className={`d-flex ${styles.form}`}>
              <Form.Control
                type="search"
                placeholder="Search"
                className={`me-2 ${styles.searchbar}`}
                aria-label="Search"
              />
              <Button
                variant="outline-success"
                className={`${styles.searchbtn}`}
              >
                Search
              </Button>
              {props.connected && (
                <Button
                  type="button"
                  className={`btn btn-secondary ${styles.connectwallet}`}
                  disabled = {true}
                >
                  Connected!
                </Button>
              )}
              {!props.connected && (
                <Button
                  type="button"
                  className={`btn btn-primary ${styles.connectwallet}`}
                  onClick={props.connectWallet}
                >
                  Connect Wallet
                </Button>
              )}
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;
