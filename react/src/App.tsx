import "./shared/globals.css";
import { DebugPanel } from "app/debug-panel";
import { Router } from "app/routes";
import { BrowserRouter } from "react-router-dom";
import Test from "widgets/button/Shiny";

function App() {
  return (
    <>
      <BrowserRouter>
        <DebugPanel />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
