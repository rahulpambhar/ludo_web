import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Wallet from "./containers/Component/Wallet";
import Registration from "./containers/Component/Registration";
import Joinroom from "./containers/Component/Joinroom";
import Payment from "./containers/Component/Payment";
import Dashboard from "./containers/Component/Dashboard";
import Setting from "./containers/Component/Setting";
import History from "./containers/Component/History";
import Gamestore from "./containers/Component/Gamestore";
import Gameboard from "./containers/Component/Gameboard";

// import * as serviceWorker from "./serviceWorker";
// import   HeaderGameZone  from "./containers/layout/headerGameZone";

// import Loading from "./containers/Component/Loading";
// import NewRegistration from "./containers/Pages/newRegistration";
// import Getstart from "./containers/Pages/GetStart";
import GameZone from "./containers/Pages/GameZone";
// import CreateRoom from "./containers/Pages/CreateRoom";
import { Ludo } from "./containers/Ludo/Container";


function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Getstart />} /> */}
          {/* <Route path="/" element={<Loading />} /> */}
          <Route path="/" element={<Wallet />} />
          <Route path="/gameZone" element={<GameZone />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/joinroom" element={<Joinroom />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/History" element={<History />} />
          <Route path="/Gamestore" element={<Gamestore />} />
          <Route path="/Gameboard" element={<Gameboard />} />
          <Route path="/ludo" element={<Ludo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
