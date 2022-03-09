import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolBar from "./components/ToolBar";
import ContentView from "./components/ContentView";
import projectConfigFile from "./test.json";
import GoogleDrive from './GoogleDrive.js'
import "./App.css";

const startProject = {
  projectName: "New Project",
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
  const [contentViewState, setContentViewState] = React.useState(false);
  const [contentViewContent, setContentViewContent] = React.useState("");

  function loadNodeContentView(nodeTitle) {
    let fileName = (nodeTitle.split(" ")).map((word) => (word[0].toUpperCase() + word.substr(1))).join("");
    fileName=(fileName.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, ""));
    let fileBase64 = projectConfig[fileName];
    setContentViewContent(atob(fileBase64));
    toggleContentView(true);
  }

  function onOpenFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setProjectConfig(JSON.parse(e.target.result));
    };
  };

  function toggleContentView(state) {
    setContentViewState(state);
  };

  function onProjectChange(newProjectConfig) {
    setProjectConfig(newProjectConfig);
  }

  return (
    <div className="App">
      <Header />
      <ToolBar projectName={projectConfig.projectName} onOpenFile={onOpenFile}/>
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
