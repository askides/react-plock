import logo from "./logo.svg";
import "./App.css";

import { Plock } from "react-plock";

function App() {
  return (
    <div className="App">
      <Plock gap={20}>
        <div style={{ height: 100, width: "100%", background: "yellow" }}>
          1
        </div>
        <div style={{ height: 200, width: "100%", background: "blue" }}>2</div>
        <div style={{ height: 150, width: "100%", background: "red" }}>3</div>
        <div style={{ height: 500, width: "100%", background: "orange" }}>
          4
        </div>
      </Plock>
    </div>
  );
}

export default App;
