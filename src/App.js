import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import config from "./test.json";
import "./App.css";

function App() {
  // const [nodeList, setNodeList] = React.useState(config);
  return (
    <div className="App">
      <Header />
      <Roadmap config={config}></Roadmap>
      <Footer />
    </div>
  );
}

export default App;
