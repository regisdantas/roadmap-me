import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <AccountTree sx={{ padding: "4px" }}></AccountTree>
          <Typography variant="h5" classes={{ h5: "typo-title-h5" }}>
            <a href=" ">{props.title}</a>
          </Typography>
        </div>
        <div className="header-menu">
          <Typography variant="h6" classes={{ h6: "typo-menu-h6" }}>
            {props.menuEntries.map((menuEntry, index) => {
              let menuEntryEle;
              if (index < props.menuEntries.length - 1) {
                menuEntryEle = (
                  <>
                    <a href={menuEntry.link}>{menuEntry.name}</a> /{" "}
                  </>
                );
              } else {
                menuEntryEle = <a href={menuEntry.link}>{menuEntry.name}</a>;
              }
              return menuEntryEle;
            })}
          </Typography>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.array.isRequired,
};

export default Header;
