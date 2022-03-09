import React from "react";
import PropTypes from "prop-types";
import { IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "black",
          position: "sticky",
          top: 0,
          zIndex: "2",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
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
          {"<roadmap-diagrams>"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {};

export default Header;
