import React from "react";
import PropTypes from "prop-types";
import Xarrow from "react-xarrows";
import { AddCircleTwoTone } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";

const defaultArrowProps = {
  showHead: false,
  showTail: false,
  dashness: { animation: 1 },
  path: "smooth",
  strokeWidth: 6,
  color: "blue",
};

function Connection(props) {
  return (
    <Xarrow
      {...defaultArrowProps}
      {...props}
      key={`arrow_${props.start}_${props.end}`}
      labels={{
        middle: (
          <div style={{ position: "relative", top: "-15px" }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "white",
              }}
              color="text.primary"
              gutterBottom
            >
              {props.middleLable}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="add"
                sx={{ mr: 0 }}
                onClick={() => props.onAdd(props.start, props.end)}
              >
                <AddCircleTwoTone
                  color="success"
                  fontSize="small"
                  style={{ backgroundColor: "white", borderRadius: "25px" }}
                />
              </IconButton>
            </div>
          </div>
        ),
      }}
    />
  );
}

Connection.propTypes = {};

export default Connection;
