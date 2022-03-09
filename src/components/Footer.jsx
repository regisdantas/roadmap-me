import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Typography } from "@mui/material";

function Footer(props) {
  return (
    <Toolbar
      variant="dense"
      sx={{
        backgroundColor: "black",
        position: "sticky",
        bottom: 0,
        zIndex: "2",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          position: "relative",
          left: "20%",
        }}
        color="white"
        gutterBottom
      >
        {"</roadmap-diagrams>"}
      </Typography>
    </Toolbar>
  );
}

Footer.propTypes = {};

export default Footer;
