import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import config from "./test.json";
import "./App.css";

function App() {
  // const [nodeList, setNodeList] = React.useState(config);
  return (
    <div className="App">
      <Header/>
      <Roadmap config={config}></Roadmap>
    </div>
  );
}

export default App;
