import React, { useEffect } from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolBar from "./components/ToolBar";
import ContentView from "./components/ContentView";
import structuredClone from '@ungap/structured-clone';
import projectConfigFile from "./test.json";
import GoogleDrive from "./GoogleDrive.js";
import "./App.css";

const startProject = {
  projectName: "New Project",
  start: "Start",
  end: "Finish",
  nodes: [
    {
      title: "To Accomplish",
      content: "",
      children: [],
    },
  ],
};

function App() {
  const [projectConfig, setProjectConfig] = React.useState(structuredClone(startProject));
  const [contentViewState, setContentViewState] = React.useState(false);
  const [contentViewContent, setContentViewContent] = React.useState("");

  function loadNodeContentView(nodeContent) {
    setContentViewContent(atob(nodeContent));
    toggleContentView(true);
  }

  function onNewProject() {
    setProjectConfig(structuredClone(startProject));
  }

  function onOpenLocalFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setProjectConfig(structuredClone(JSON.parse(e.target.result)));
    };
    e.target.value = null;
  }

  function toggleContentView(state) {
    setContentViewState(state);
  }

  function onProjectChange(newProjectConfig) {
    setProjectConfig(structuredClone(newProjectConfig));
  }

  return (
    <div className="App">
      <Header />
      <ToolBar
        projectConfig={projectConfig}
        onNewProject={() => onNewProject()}
        onOpenLocalFile={onOpenLocalFile}
      />
      <div className="mainBody">
        <Roadmap
          projectConfig={projectConfig}
          onChange={onProjectChange}
          onNodeClick={loadNodeContentView}
        ></Roadmap>
        <ContentView
          contentViewContent={contentViewContent}
          contentViewState={contentViewState}
          toggleContentView={(state) => toggleContentView(state)}
        ></ContentView>
      </div>

      <Footer />
    </div>
  );
}

export default App;
