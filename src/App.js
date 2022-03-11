import React, { useEffect } from "react";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolBar from "./components/ToolBar";
import ContentView from "./components/ContentView";
import structuredClone from "@ungap/structured-clone";

import { Snackbar, Alert } from "@mui/material";
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

const initiaContentView = {
  state: false,
  title: "",
  content: "",
  checked: false,
};

function App() {
  const [projectConfig, setProjectConfig] = React.useState(
    structuredClone(startProject)
  );
  const [contentViewCtrl, setContentViewCtrl] = React.useState(
    structuredClone(initiaContentView)
  );

  const [contentViewCallbacks, setContentViewCallbacks] = React.useState({
    onCheckToggle: () => {},
    onSave: () => {},
  });

  const [snackBar, setSnackBar] = React.useState({
    state: false,
    message: "",
    type: "info",
  });

  function onSnackBarOpen(message, type) {
    setSnackBar({ ...snackBar, state: true, message: message, type: type });
  }

  const onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ ...snackBar, state: false });
  };
  function loadNodeContentView(
    checked,
    title,
    content,
    onCheckToggle,
    onSave
  ) {
    setContentViewCtrl(
      structuredClone({
        state: true,
        checked: checked,
        title: title,
        content: content,
      })
    );

    setContentViewCallbacks({
      onCheckToggle: onCheckToggle,
      onSave: onSave,

    });
  }

  function onChangeProjectName(newProkectName) {
    setProjectConfig(
      structuredClone({ ...projectConfig, projectName: newProkectName })
    );
  }

  function onNewProject() {
    setProjectConfig(structuredClone(startProject));
  }

  function onOpenLocalFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("error", () => {
      onSnackBarOpen(`Failed to open project file: ${file.name}`, "error");
    });
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        setProjectConfig(structuredClone(project));
      } catch {
        onSnackBarOpen(`Failed to read project: ${file.name}`, "error");
      }
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
    onSnackBarOpen("Project saved locally.", "success");
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
            onSnackBarOpen(
              `Project saved locally to file: ${file.name}.`,
              "success"
            );
          });
        });
      })
      .catch((err) => {
        onSnackBarOpen(`Failed to save file: ${err.message}.`, "error");
      });
  }

  function toggleContentView(state) {
    setContentViewCtrl(structuredClone({ ...contentViewCtrl, state: state }));
  }

  function onProjectChange(newProjectConfig) {
    setProjectConfig(structuredClone(newProjectConfig));
    if (contentViewCtrl.state) {
      setContentViewCtrl(structuredClone({ ...contentViewCtrl }));
    }
  }

  return (
    <div className="App">
      <Header />
      <ToolBar
        projectName={projectConfig.projectName}
        onChangeProjectName={onChangeProjectName}
        onNewProject={onNewProject}
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
          contentViewCtrl={contentViewCtrl}
          contentViewCallbacks={contentViewCallbacks}
          toggleContentView={(state) => toggleContentView(state)}
        ></ContentView>
      </div>
      <Footer />
      <Snackbar
        open={snackBar.state}
        autoHideDuration={6000}
        onClose={onSnackBarClose}
      >
        <Alert
          onClose={onSnackBarClose}
          severity={snackBar.type}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
