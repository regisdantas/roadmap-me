import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header(props) {
  return (
    <AppBar position="sticky" top="0" zIndex="2">
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "black",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            position: "absolute",
            left: "100px",
          }}
          color="white"
          gutterBottom
        >
          {"<roadmap-diagrams>"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {};

export default Header;
