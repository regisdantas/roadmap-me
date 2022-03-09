import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ReactMarkdown from "react-markdown";

function ContentView(props) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.contentViewState}
        onClose={() => props.toggleContentView(false)}
      >
        <Box
          sx={{ width: 600 }}
          role="presentation"
          onClick={() => props.toggleContentView(false)}
          onKeyDown={() => props.toggleContentView(false)}
        >
          <div style={{ margin: '0px 20px 0px', padding: '0px 20px 0px' }}>
            <ReactMarkdown>{props.contentViewContent}</ReactMarkdown>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

ContentView.propTypes = {};

export default ContentView;
