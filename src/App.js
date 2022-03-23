import React, { useEffect } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Roadmap from "./components/Roadmap/Roadmap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ToolBar from "./components/ToolBar/ToolBar";
import ContentView from "./components/ContentView/ContentView";
import structuredClone from "@ungap/structured-clone";

import { Snackbar, Alert } from "@mui/material";
// import GoogleDrive from "./GoogleDrive.js";
import "./App.css";

const startProject = {
  projectName: "New Project",
  start: "From",
  end: "Toward",
  nodes: [
    {
      title: "Example Node",
      content:
        "IyBUYWJsZSBvZiBDb250ZW50cwotLS0KCiMgaDEgSGVhZGluZyA4LSkKIyMgaDIgSGVhZGluZwojIyMgaDMgSGVhZGluZwojIyMjIGg0IEhlYWRpbmcKIyMjIyMgaDUgSGVhZGluZwojIyMjIyMgaDYgSGVhZGluZwoKIyMgQmFkZ2VzCgohW1JlYWRdKGh0dHBzOi8vaW1nLnNoaWVsZHMuaW8vYmFkZ2UvLVJFQUQtYmx1ZSkgLSBSZWFkIHRoaXMgdGV4dC4KIVtXYXRjaF0oaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9iYWRnZS8tV0FUQ0gtYmx1ZXZpb2xldCkgLSBXYXRjaCB0aGlzIHbtZGVvLgohW1N1Y2Nlc3NdKGh0dHBzOi8vaW1nLnNoaWVsZHMuaW8vYmFkZ2UvLVNVQ0NFU1Mtc3VjY2VzcykgLSBGaW5pc2hlZCB3aXRoIHN1Y2Nlc3MuCiFbV2FybmluZ10oaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9iYWRnZS8tV0FSTi15ZWxsb3cpIC0gV2FybmluZzogcGF5IGF0dGVudGlvbiBvbiB0aGlzLgohW0Vycm9yXShodHRwczovL2ltZy5zaGllbGRzLmlvL2JhZGdlLy1FUlJPUi1yZWQpIC0gRXJyb3I6IGZpbmlzaGVkIHdpdGggZXJyb3JzLgpbIVtDcmVhdGVdKGh0dHBzOi8vaW1nLnNoaWVsZHMuaW8vYmFkZ2UvLUNSRUFURSUyMFlPVVIlMjBPV04tRkY2OUI0KV0oaHR0cHM6Ly9zaGllbGRzLmlvLykgLSBDbGljayB0aGlzIHRvIGNyZWF0ZSB5b3VyIG93biBjdXN0b21pemVkIGJhZGdlcy4KCiMjIEhvcml6b250YWwgUnVsZXMKCiMjIyBXaXRoIHVuZGVyc2NvcmVzCl9fXwoKIyMjIFdpdGggZGFzaGVzCi0tLQoKIyMjIFdpdGggc3RhcnMKKioqCgojIyBDaGVja0xpc3RzCgoqIFt4XSBMaXN0IGl0ZW0gY2hlY2tlZAoqIFt4XSBMaXN0IGl0ZW0gY2hlY2tlZAoqIFsgXSBMaXN0IGl0ZW0gdW5jaGVja2VkCiogW3hdIExpc3QgaXRlbSBjaGVja2VkCiogWyBdIExpc3QgaXRlbSB1bmNoZWNrZWQKKiBbeF0gTGlzdCBpdGVtIGNoZWNrZWQKCiMjIEVtcGhhc2lzCgoqKlRoaXMgaXMgYm9sZCB0ZXh0KioKCl9fVGhpcyBpcyBib2xkIHRleHRfXwoKKlRoaXMgaXMgaXRhbGljIHRleHQqCgpfVGhpcyBpcyBpdGFsaWMgdGV4dF8KCn5+U3RyaWtldGhyb3VnaH5+CgojIyBCbG9ja3F1b3RlcwoKPiBCbG9ja3F1b3RlcyBjYW4gYWxzbyBiZSBuZXN0ZWQuLi4KPj4gLi4uYnkgdXNpbmcgYWRkaXRpb25hbCBncmVhdGVyLXRoYW4gc2lnbnMgcmlnaHQgbmV4dCB0byBlYWNoIG90aGVyLi4uCj4gPiA+IC4uLm9yIHdpdGggc3BhY2VzIGJldHdlZW4gYXJyb3dzLgoKIyMgTGlzdHMKClVub3JkZXJlZAoKKyBDcmVhdGUgYSBsaXN0IGJ5IHN0YXJ0aW5nIGEgbGluZSB3aXRoIGArYCwgYC1gLCBvciBgKmAKKyBTdWItbGlzdHMgYXJlIG1hZGUgYnkgaW5kZW50aW5nIDIgc3BhY2VzOgo+ICAtIE1hcmtlciBjaGFyYWN0ZXIgY2hhbmdlIGZvcmNlcyBuZXcgbGlzdCBzdGFydDoKPj4gICAgKiBBYyB0cmlzdGlxdWUgbGliZXJvIHZvbHV0cGF0IGF0CiAgICArIEZhY2lsaXNpcyBpbiBwcmV0aXVtIG5pc2wgYWxpcXVldAogICAgLSBOdWxsYSB2b2x1dHBhdCBhbGlxdWFtIHZlbGl0CisgVmVyeSBlYXN5IQoKT3JkZXJlZAoKMS4gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQKMi4gQ29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0CjMuIEludGVnZXIgbW9sZXN0aWUgbG9yZW0gYXQgbWFzc2EKCjEuIFlvdSBjYW4gdXNlIHNlcXVlbnRpYWwgbnVtYmVycy4uLgoxLiAuLi5vciBrZWVwIGFsbCB0aGUgbnVtYmVycyBhcyBgMS5gCgpTdGFydCBudW1iZXJpbmcgd2l0aCBvZmZzZXQ6Cgo1Ny4gZm9vCjEuIGJhcgoKIyMgQ29kZQoKSW5saW5lIGBjb2RlYAoKSW5kZW50ZWQgY29kZQoKICAgIC8vIFNvbWUgY29tbWVudHMKICAgIGxpbmUgMSBvZiBjb2RlCiAgICBsaW5lIDIgb2YgY29kZQogICAgbGluZSAzIG9mIGNvZGUKCkJsb2NrIGNvZGUgImZlbmNlcyIKCmBgYApTYW1wbGUgdGV4dCBoZXJlLi4uCmBgYAoKU3ludGF4IGhpZ2hsaWdodGluZwoKYGBgIGpzCnZhciBmb28gPSBmdW5jdGlvbiAoYmFyKSB7CiAgcmV0dXJuIGJhcisrOwp9OwoKY29uc29sZS5sb2coZm9vKDUpKTsKYGBgCgojIyBUYWJsZXMKCnwgT3B0aW9uIHwgRGVzY3JpcHRpb24gfAp8IC0tLS0tLSB8IC0tLS0tLS0tLS0tIHwKfCBkYXRhICAgfCBwYXRoIHRvIGRhdGEgZmlsZXMgdG8gc3VwcGx5IHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW50byB0ZW1wbGF0ZXMuIHwKfCBlbmdpbmUgfCBlbmdpbmUgdG8gYmUgdXNlZCBmb3IgcHJvY2Vzc2luZyB0ZW1wbGF0ZXMuIEhhbmRsZWJhcnMgaXMgdGhlIGRlZmF1bHQuIHwKfCBleHQgICAgfCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZGVzdCBmaWxlcy4gfAoKXApSaWdodCBhbGlnbmVkIGNvbHVtbnMKCnwgT3B0aW9uIHwgRGVzY3JpcHRpb24gfAp8IC0tLS0tLTp8IC0tLS0tLS0tLS0tOnwKfCBkYXRhICAgfCBwYXRoIHRvIGRhdGEgZmlsZXMgdG8gc3VwcGx5IHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW50byB0ZW1wbGF0ZXMuIHwKfCBlbmdpbmUgfCBlbmdpbmUgdG8gYmUgdXNlZCBmb3IgcHJvY2Vzc2luZyB0ZW1wbGF0ZXMuIEhhbmRsZWJhcnMgaXMgdGhlIGRlZmF1bHQuIHwKfCBleHQgICAgfCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZGVzdCBmaWxlcy4gfAoKIyMgTGlua3MKCltsaW5rIHRleHRdKGh0dHBzOi8vZ2l0aHViLmNvbS9yZWdpc2RhbnRhcy9yb2FkbWFwLW1lKQoKW2xpbmsgd2l0aCB0aXRsZV0oaHR0cHM6Ly9naXRodWIuY29tL3JlZ2lzZGFudGFzL3JvYWRtYXAtbWUgInRpdGxlIHRleHQhIikKCkNvbW1vbjogaHR0cHM6Ly9naXRodWIuY29tL3JlZ2lzZGFudGFzL3JvYWRtYXAtbWUKCiMjIEltYWdlcwoKIVtNaW5pb25dKGh0dHBzOi8vb2N0b2RleC5naXRodWIuY29tL2ltYWdlcy9taW5pb24ucG5nKQoKIyMjIEVtb2ppZXMKCj4gQ2xhc3NpYyBtYXJrdXA6IDp3aW5rOiA6Y3J1c2g6IDpjcnk6IDp0ZWFyOiA6bGF1Z2hpbmc6IDp5dW06Cj4KPiBTaG9ydGN1dHMgKGVtb3RpY29ucyk6IDotKSA6LSggOC0pIDspCgojIyMgRm9vdG5vdGVzCgpGb290bm90ZSAxIGxpbmtbXmZpcnN0XS4KCkZvb3Rub3RlIDIgbGlua1tec2Vjb25kXS4KCklubGluZSBmb290bm90ZV5bVGV4dCBvZiBpbmxpbmUgZm9vdG5vdGVdIGRlZmluaXRpb24uCgpEdXBsaWNhdGVkIGZvb3Rub3RlIHJlZmVyZW5jZVtec2Vjb25kXS4KClteZmlyc3RdOiBGb290bm90ZSAqKmNhbiBoYXZlIG1hcmt1cCoqCgogICAgYW5kIG11bHRpcGxlIHBhcmFncmFwaHMuCgpbXnNlY29uZF06IEZvb3Rub3RlIHRleHQuCgo=",
      children: [],
    },
  ],
};

const menuEntries = [
  { name: "Author", link: "author" },
  { name: "Contact", link: "contact" },
  { name: "Examples", link: "examples" },
  { name: "GitHub", link: "github" },
  { name: "Portifolio", link: "portifolio" },
];

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
  function loadNodeContentView(checked, title, content, onCheckToggle, onSave) {
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
  const { width, height } = useWindowDimensions();
  return (
    <div className="App">
      <Header title="ROADMAP.me" menuEntries={menuEntries} />
      <ToolBar
        projectName={projectConfig.projectName}
        onChangeProjectName={onChangeProjectName}
        onNewProject={onNewProject}
        onOpenLocalFile={onOpenLocalFile}
        onSaveLocalFile={onSaveLocalFile}
        onSaveAsLocalFile={onSaveAsLocalFile}
      />
      <div
        className="mainBody"
        style={{ minHeight: `${height > 300 ? height - 140 : 300}px` }}
      >
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
