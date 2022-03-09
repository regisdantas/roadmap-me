import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Xarrow from "react-xarrows";
import { AddCircleTwoTone } from "@mui/icons-material";
import { Typography } from "@mui/material";
import "./Roadmap.css";

const arrowProps = {
  showHead: false,
  showTail: false,
  dashness: { animation: 1 },
  path: "smooth",
  strokeWidth: 6,
  color: "blue",
};

function Roadmap(props) {
  const { start, end, nodes } = props.config;
  let connections = [];
  connections.push(
    <Xarrow
      {...arrowProps}
      key={`arrow_container_Node_0`}
      start={"container"}
      end={`Node_0`}
      startAnchor="top"
      endAnchor="top"
      color="gray"
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
              {start}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AddCircleTwoTone
                color="success"
                fontSize="small"
                style={{ backgroundColor: "white", borderRadius: "25px" }}
              />
            </div>
          </div>
        ),
      }}
    />
  );
  for (let i = 0; i < nodes.length - 1; i++) {
    connections.push(
      <Xarrow
        {...arrowProps}
        key={`arrow_${i}_cnx_${i + 1}`}
        start={`Node_${i}`}
        end={`Node_${i + 1}`}
        startAnchor="bottom"
        endAnchor="top"
        labels={{
          middle: (
            <AddCircleTwoTone
              color="success"
              fontSize="small"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            />
          ),
        }}
      />
    );
  }
  connections.push(
    <Xarrow
      {...arrowProps}
      key={`arrow_Node_${nodes.length - 1}_container`}
      start={`Node_${nodes.length - 1}`}
      end={"container"}
      startAnchor="bottom"
      endAnchor="bottom"
      color="gray"
      labels={{
        middle: (
          <div style={{ position: "relative", top: "15px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AddCircleTwoTone
                color="success"
                fontSize="small"
                style={{ backgroundColor: "white", borderRadius: "25px" }}
              />
            </div>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "white",
              }}
              color="text.primary"
              gutterBottom
            >
              {end}
            </Typography>
          </div>
        ),
      }}
    />
  );
  return (
    <div className="container" id="container">
      {nodes.map((layerNode, layerNumber) => {
        return (
          <div className="layer" key={`layerdiv_${layerNumber}`}>
            <Node
              key={`Node_${layerNumber}`}
              nodeID={`Node_${layerNumber}`}
              node={layerNode}
              parent=""
              level={0}
            />
          </div>
        );
      })}
      {connections}
    </div>
  );
}

Roadmap.propTypes = {
  nodes: PropTypes.array,
};

export default Roadmap;
