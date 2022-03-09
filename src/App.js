import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolBar from "./components/ToolBar";
import projectConfigFile from "./test.json";
import "./App.css";

const startProject = {
  start: "Start",
  end: "Finish",
  nodes: [
    {
      title: "To Accomplish",
      children: [],
    },
  ],
};

function App() {
  const [projectConfig, setProjectConfig] = React.useState(projectConfigFile);

  function onProjectChange(newProjectConfig) {
    setProjectConfig(newProjectConfig);
  }

  return (
    <div className="App">
      <Header />
      <ToolBar />
      <div className="mainBody">
        <Roadmap
          projectConfig={projectConfig}
          onChange={onProjectChange}
        ></Roadmap>
      </div>

      <Footer />
    </div>
  );
}

export default App;
