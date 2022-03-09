import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import projectConfigFile from "./test.json";
import "./App.css";

function App() {
  const [projectConfig, setProjectConfig] = React.useState(projectConfigFile);

  function onProjectChange(newProjectConfig) {
    setProjectConfig(newProjectConfig);
  }

  return (
    <div className="App">
      <Header />
      <div>
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
