import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, TextField, IconButton } from "@mui/material";
import {
  BackupTableTwoTone,
  SaveTwoTone,
  FeedTwoTone,
  FolderOpenTwoTone,
  SaveAsTwoTone,
} from "@mui/icons-material";

const styles = {
  customizeToolbar: {
    minHeight: "36px",
  },
};

function ToolBar({
  projectConfig,
  onNewProject,
  onSaveLocalFile,
  onSaveAsLocalFile,
  onOpenLocalFile,
}) {
  return (
    <AppBar position="fixed" sx={{ top: "48px", zIndex: "2" }}>
      <Toolbar
        style={styles.customizeToolbar}
        variant="dense"
        sx={{
          backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "70%",
              justifyContent: "left",
            }}
          >
            <BackupTableTwoTone
              color="disabled"
              sx={{ margin: "4px 5px 0px" }}
            ></BackupTableTwoTone>
            <TextField
              variant="standard"
              size="small"
              color="primary"
              sx={{
                backgroundColor: "white",
                margin: "2px 5px 0px",
                padding: "0px 5px 0px",
              }}
              defaultValue={projectConfig.projectName}
            ></TextField>
            <IconButton
              size="small"
              edge="start"
              color="primary"
              aria-label="check"
              sx={{ mr: 0 }}
              onClick={() => onNewProject()}
            >
              <FeedTwoTone />
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              aria-label="check"
              sx={{ mr: 0, color: "orange" }}
              component="label"
            >
              <FolderOpenTwoTone />
              <input
                type="file"
                accept=".json"
                hidden
                onChange={(e) => onOpenLocalFile(e)}
              />
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="success"
              aria-label="check"
              sx={{ mr: 0 }}
              onClick={() => onSaveLocalFile()}
            >
              <SaveTwoTone />
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="secondary"
              aria-label="check"
              sx={{ mr: 0 }}
              onClick={() => onSaveAsLocalFile()}
            >
              <SaveAsTwoTone />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

ToolBar.propTypes = {};

export default ToolBar;
