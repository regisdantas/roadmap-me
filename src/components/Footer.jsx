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
        display: "flex",
          flexDirection: "row",
          justifyContent: "center",
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
        {"</roadmap-diagrams>"}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "",
        }}
        color="white"
        gutterBottom
      >
        {"by Regis Dantas"}
      </Typography>
    </Toolbar>
  );
}

Footer.propTypes = {};

export default Footer;
