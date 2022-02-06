import React from "react";
import ReactDOM from "react-dom";
import { Plock } from "./components";

function App() {
  const configuration = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
    { size: 1680, columns: 8 },
  ];

  return (
    <Plock gap={20} nColumns={configuration} debounce={200}>
      <div style={{ height: 100, width: "100%", background: "yellow" }}>1</div>
      <div style={{ height: 200, width: "100%", background: "blue" }}>2</div>
      <div style={{ height: 150, width: "100%", background: "red" }}>3</div>
      <div style={{ height: 500, width: "100%", background: "orange" }}>4</div>
    </Plock>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
