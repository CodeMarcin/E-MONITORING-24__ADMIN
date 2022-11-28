import { Outlet } from "react-router-dom";

import { TopSection } from "./Pages/TopSection/TopSection";

function App() {
  return (
    <div className="App">
      <TopSection />
      <Outlet />
    </div>
  );
}

export default App;
