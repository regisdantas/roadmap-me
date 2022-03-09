import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Typography } from "@mui/material";

function Footer(props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "black",
          zIndex: "2",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
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
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
