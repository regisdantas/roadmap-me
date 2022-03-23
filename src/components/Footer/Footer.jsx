import React from "react";
import { Typography } from "@mui/material";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Typography classes={{ root: "typo-root" }}>
        {"by Regis Dantas"}
      </Typography>
    </footer>
  );
}

export default Footer;
