import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ReactMarkdown from "react-markdown";
import "./ContentView.css";

function ContentView(props) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.contentViewState}
        onClose={() => props.toggleContentView(false)}
      >
        <Box
          sx={{ width: "50vw" }}
          role="presentation"
        >
          <div className="contentView" style={{ margin: '0px 20px 0px', padding: '0px 20px 0px' }}>
            <ReactMarkdown>{props.contentViewContent}</ReactMarkdown>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

ContentView.propTypes = {};

export default ContentView;
