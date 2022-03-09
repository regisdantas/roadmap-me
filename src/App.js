import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import config from "./test.json";
import "./App.css";

function App() {
  // const [nodeList, setNodeList] = React.useState(config);
  const [menuState, setMenuState] = React.useState(false);

  const toggleMenu = (state) => {
    setMenuState(state);
  };

  return (
    <div className="App">
      <Header toggleMenu={(state) => toggleMenu(state)} />
      <div>
        <Menu
          menuState={menuState}
          toggleMenu={(state) => toggleMenu(state)}
        ></Menu>
        <Roadmap config={config}></Roadmap>
      </div>

      <Footer />
    </div>
  );
}

export default App;
