import React from "react";
import PropTypes from "prop-types";
import { IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header(props) {
  return (
    <AppBar position="sticky" top="0" zIndex="2">
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "black",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => props.toggleMenu(true)}
        >
          <MenuIcon />
        </IconButton>
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
