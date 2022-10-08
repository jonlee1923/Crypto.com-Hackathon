import styles from './App.module.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.jsx"
import { useContext } from 'react';
import { DnsContext } from './context/DnsContext';

function App() {
  const {connected, connectWallet} = useContext(DnsContext);

  return (
    <div className="App">
    <div>Hi</div>
      <Navbar connected = {connected} connectWallet={connectWallet}/>
    </div>
  );
}
export default App;
