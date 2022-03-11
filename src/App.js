import React, { useEffect } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
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
  start: "From",
  end: "Toward",
  nodes: [
    {
      title: "Example Node",
      content: "IyBUYWJsZSBvZiBDb250ZW50cwotLS0KCiMgaDEgSGVhZGluZyA4LSkKIyMgaDIgSGVhZGluZwojIyMgaDMgSGVhZGluZwojIyMjIGg0IEhlYWRpbmcKIyMjIyMgaDUgSGVhZGluZwojIyMjIyMgaDYgSGVhZGluZwoKCiMjIEhvcml6b250YWwgUnVsZXMKCl9fXwoKLS0tCgoqKioKCiMjIENoZWNrTGlzdHMKCiogW3hdIExpc3QgaXRlbSBjaGVja2VkCiogW3hdIExpc3QgaXRlbSBjaGVja2VkCiogWyBdIExpc3QgaXRlbSB1bmNoZWNrZWQKKiBbeF0gTGlzdCBpdGVtIGNoZWNrZWQKKiBbIF0gTGlzdCBpdGVtIHVuY2hlY2tlZAoqIFt4XSBMaXN0IGl0ZW0gY2hlY2tlZAoKIyMgRW1waGFzaXMKCioqVGhpcyBpcyBib2xkIHRleHQqKgoKX19UaGlzIGlzIGJvbGQgdGV4dF9fCgoqVGhpcyBpcyBpdGFsaWMgdGV4dCoKCl9UaGlzIGlzIGl0YWxpYyB0ZXh0XwoKfn5TdHJpa2V0aHJvdWdofn4KCgojIyBCbG9ja3F1b3RlcwoKCj4gQmxvY2txdW90ZXMgY2FuIGFsc28gYmUgbmVzdGVkLi4uCj4+IC4uLmJ5IHVzaW5nIGFkZGl0aW9uYWwgZ3JlYXRlci10aGFuIHNpZ25zIHJpZ2h0IG5leHQgdG8gZWFjaCBvdGhlci4uLgo+ID4gPiAuLi5vciB3aXRoIHNwYWNlcyBiZXR3ZWVuIGFycm93cy4KCgojIyBMaXN0cwoKVW5vcmRlcmVkCgorIENyZWF0ZSBhIGxpc3QgYnkgc3RhcnRpbmcgYSBsaW5lIHdpdGggYCtgLCBgLWAsIG9yIGAqYAorIFN1Yi1saXN0cyBhcmUgbWFkZSBieSBpbmRlbnRpbmcgMiBzcGFjZXM6Cj4gIC0gTWFya2VyIGNoYXJhY3RlciBjaGFuZ2UgZm9yY2VzIG5ldyBsaXN0IHN0YXJ0Ogo+PiAgICAqIEFjIHRyaXN0aXF1ZSBsaWJlcm8gdm9sdXRwYXQgYXQKICAgICsgRmFjaWxpc2lzIGluIHByZXRpdW0gbmlzbCBhbGlxdWV0CiAgICAtIE51bGxhIHZvbHV0cGF0IGFsaXF1YW0gdmVsaXQKKyBWZXJ5IGVhc3khCgpPcmRlcmVkCgoxLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldAoyLiBDb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQKMy4gSW50ZWdlciBtb2xlc3RpZSBsb3JlbSBhdCBtYXNzYQoKCjEuIFlvdSBjYW4gdXNlIHNlcXVlbnRpYWwgbnVtYmVycy4uLgoxLiAuLi5vciBrZWVwIGFsbCB0aGUgbnVtYmVycyBhcyBgMS5gCgpTdGFydCBudW1iZXJpbmcgd2l0aCBvZmZzZXQ6Cgo1Ny4gZm9vCjEuIGJhcgoKCiMjIENvZGUKCklubGluZSBgY29kZWAKCkluZGVudGVkIGNvZGUKCiAgICAvLyBTb21lIGNvbW1lbnRzCiAgICBsaW5lIDEgb2YgY29kZQogICAgbGluZSAyIG9mIGNvZGUKICAgIGxpbmUgMyBvZiBjb2RlCgoKQmxvY2sgY29kZSAiZmVuY2VzIgoKYGBgClNhbXBsZSB0ZXh0IGhlcmUuLi4KYGBgCgpTeW50YXggaGlnaGxpZ2h0aW5nCgpgYGAganMKdmFyIGZvbyA9IGZ1bmN0aW9uIChiYXIpIHsKICByZXR1cm4gYmFyKys7Cn07Cgpjb25zb2xlLmxvZyhmb28oNSkpOwpgYGAKCiMjIFRhYmxlcwoKfCBPcHRpb24gfCBEZXNjcmlwdGlvbiB8CnwgLS0tLS0tIHwgLS0tLS0tLS0tLS0gfAp8IGRhdGEgICB8IHBhdGggdG8gZGF0YSBmaWxlcyB0byBzdXBwbHkgdGhlIGRhdGEgdGhhdCB3aWxsIGJlIHBhc3NlZCBpbnRvIHRlbXBsYXRlcy4gfAp8IGVuZ2luZSB8IGVuZ2luZSB0byBiZSB1c2VkIGZvciBwcm9jZXNzaW5nIHRlbXBsYXRlcy4gSGFuZGxlYmFycyBpcyB0aGUgZGVmYXVsdC4gfAp8IGV4dCAgICB8IGV4dGVuc2lvbiB0byBiZSB1c2VkIGZvciBkZXN0IGZpbGVzLiB8CgpSaWdodCBhbGlnbmVkIGNvbHVtbnMKCnwgT3B0aW9uIHwgRGVzY3JpcHRpb24gfAp8IC0tLS0tLTp8IC0tLS0tLS0tLS0tOnwKfCBkYXRhICAgfCBwYXRoIHRvIGRhdGEgZmlsZXMgdG8gc3VwcGx5IHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW50byB0ZW1wbGF0ZXMuIHwKfCBlbmdpbmUgfCBlbmdpbmUgdG8gYmUgdXNlZCBmb3IgcHJvY2Vzc2luZyB0ZW1wbGF0ZXMuIEhhbmRsZWJhcnMgaXMgdGhlIGRlZmF1bHQuIHwKfCBleHQgICAgfCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZGVzdCBmaWxlcy4gfAoKCiMjIExpbmtzCgpbbGluayB0ZXh0XShodHRwOi8vZGV2Lm5vZGVjYS5jb20pCgpbbGluayB3aXRoIHRpdGxlXShodHRwOi8vbm9kZWNhLmdpdGh1Yi5pby9yZWdpc2RhbnRhcy9yb2FkbWFwLW1lICJ0aXRsZSB0ZXh0ISIpCgpBdXRvY29udmVydGVkIGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3JlZ2lzZGFudGFzL3JvYWRtYXAtbWUgKGVuYWJsZSBsaW5raWZ5IHRvIHNlZSkKCgojIyBJbWFnZXMKCiFbTWluaW9uXShodHRwczovL29jdG9kZXguZ2l0aHViLmNvbS9pbWFnZXMvbWluaW9uLnBuZykKIVtTdG9ybXRyb29wb2NhdF0oaHR0cHM6Ly9vY3RvZGV4LmdpdGh1Yi5jb20vaW1hZ2VzL3N0b3JtdHJvb3BvY2F0LmpwZyAiVGhlIFN0b3JtdHJvb3BvY2F0IikKCkxpa2UgbGlua3MsIEltYWdlcyBhbHNvIGhhdmUgYSBmb290bm90ZSBzdHlsZSBzeW50YXgKCiFbQWx0IHRleHRdW2lkXQoKV2l0aCBhIHJlZmVyZW5jZSBsYXRlciBpbiB0aGUgZG9jdW1lbnQgZGVmaW5pbmcgdGhlIFVSTCBsb2NhdGlvbjoKCltpZF06IGh0dHBzOi8vb2N0b2RleC5naXRodWIuY29tL2ltYWdlcy9kb2pvY2F0LmpwZyAgIlRoZSBEb2pvY2F0IgoKCiMjIyBFbW9qaWVzCgo+IENsYXNzaWMgbWFya3VwOiA6d2luazogOmNydXNoOiA6Y3J5OiA6dGVhcjogOmxhdWdoaW5nOiA6eXVtOgo+Cj4gU2hvcnRjdXRzIChlbW90aWNvbnMpOiA6LSkgOi0oIDgtKSA7KQoKCiMjIyBGb290bm90ZXMKCkZvb3Rub3RlIDEgbGlua1teZmlyc3RdLgoKRm9vdG5vdGUgMiBsaW5rW15zZWNvbmRdLgoKSW5saW5lIGZvb3Rub3RlXltUZXh0IG9mIGlubGluZSBmb290bm90ZV0gZGVmaW5pdGlvbi4KCkR1cGxpY2F0ZWQgZm9vdG5vdGUgcmVmZXJlbmNlW15zZWNvbmRdLgoKW15maXJzdF06IEZvb3Rub3RlICoqY2FuIGhhdmUgbWFya3VwKioKCiAgICBhbmQgbXVsdGlwbGUgcGFyYWdyYXBocy4KCltec2Vjb25kXTogRm9vdG5vdGUgdGV4dC4KCg==",
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
      <Header />
      <ToolBar
        projectName={projectConfig.projectName}
        onChangeProjectName={onChangeProjectName}
        onNewProject={onNewProject}
        onOpenLocalFile={onOpenLocalFile}
        onSaveLocalFile={onSaveLocalFile}
        onSaveAsLocalFile={onSaveAsLocalFile}
      />
      <div className="mainBody" style={{ minHeight: `${ (height>300) ? height-140 : 300}px` }}>
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
