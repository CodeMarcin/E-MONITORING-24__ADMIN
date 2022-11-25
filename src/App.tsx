import { Outlet } from "react-router-dom";

import { TopSection } from "./Pages/TopSection/TopSection";
import { Login } from "./Pages/Login/Login";
import { PopupModal } from "./Components/PopupModal/PopupModal";
import { Header } from "./Components/Header/Header";
import { Accordion } from "./Components/Accordion/Accordion";
import { ContractorAdd } from "./Pages/Contrators/ContractorAdd/ContractorAdd";

function App() {
  return (
    <div className="App">
      <TopSection />
      {/* <ContractorAdd /> */}
      <Outlet />
      {/* <Login /> */}
    </div>
  );
}

export default App;
