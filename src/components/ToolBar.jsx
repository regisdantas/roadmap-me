import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, TextField } from "@mui/material";
import { BackupTableTwoTone } from "@mui/icons-material";

const styles = {
  customizeToolbar: {
    minHeight: "36px",
  },
};

function ToolBar(props) {
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
              color="primary"
              sx={{ margin: "4px 5px 0px" }}
            ></BackupTableTwoTone>
            <TextField
              variant="standard"
              size="small"
              color="primary"
              sx={{ backgroundColor: "white", margin: "2px 5px 0px" }}
            ></TextField>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

ToolBar.propTypes = {};

export default ToolBar;
