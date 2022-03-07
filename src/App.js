import React from "react";
import Roadmap from "./components/Roadmap";
import config from "./test.json";

function App() {
  const [nodeList, setNodeList] = React.useState(config);
  return (
    <div className="App">
      <Roadmap nodes={nodeList}></Roadmap>
    </div>
  );
}

export default App;
