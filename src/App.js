import React from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolBar from "./components/ToolBar";
import ContentView from "./components/ContentView";
import structuredClone from "@ungap/structured-clone";

import { Snackbar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
// import GoogleDrive from "./GoogleDrive.js";
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
  const [projectConfig, setProjectConfig] = React.useState(
    structuredClone(startProject)
  );
  const [contentViewState, setContentViewState] = React.useState(false);
  const [contentViewContent, setContentViewContent] = React.useState({
    title: "",
    body: "",
  });
  const [snackBar, setSnackBar] = React.useState({ state: false, message: "" });

  const snackBarContent = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => onSnackBarClose()}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function onSnackBarOpen(message) {
    setSnackBar({ state: true, message: message });
  }

  const onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ state: false, message: "" });
  };
  function loadNodeContentView(node) {
    setContentViewContent({ title: node.title, body: atob(node.content) });
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

  function onSaveLocalFile() {
    const file = new File(
      [JSON.stringify(projectConfig, null, 2)],
      `${projectConfig.projectName}.json`,
      { type: "text/plain;charset=utf-8" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = `${projectConfig.projectName}.json`;
    a.click();
    onSnackBarOpen("File saved");
  }

  function onSaveAsLocalFile() {
    const opts = {
      suggestedName: `${projectConfig.projectName}.json`,
      types: [
        {
          description: "Roadmap JSON Project",
          accept: { "application/json": [".json"] },
        },
      ],
    };
    window
      .showSaveFilePicker(opts)
      .then((file) => {
        projectConfig.projectName = file.name.replace(".json", "");
        onProjectChange(projectConfig);
        file.createWritable().then((writer) => {
          writer.write(JSON.stringify(projectConfig, null, 2)).then(() => {
            writer.close();
          });
        });
      })
      .catch((err) => {
        console.log(err);
        onSnackBarOpen(`Failed to save file: ${err.message}`);
      });
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
        onSaveLocalFile={onSaveLocalFile}
        onSaveAsLocalFile={onSaveAsLocalFile}
      />
      <div className="mainBody">
        <Roadmap
          projectConfig={projectConfig}
          onChange={onProjectChange}
          onNodeClick={loadNodeContentView}
        ></Roadmap>
        <ContentView
          content={contentViewContent}
          contentViewState={contentViewState}
          toggleContentView={(state) => toggleContentView(state)}
        ></ContentView>
      </div>
      <Footer />
      <Snackbar
        open={snackBar.state}
        autoHideDuration={6000}
        onClose={onSnackBarClose}
        message={snackBar.message}
        action={snackBarContent}
      />
    </div>
  );
}

export default App;
