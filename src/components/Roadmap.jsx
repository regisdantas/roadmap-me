import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Xarrow from "react-xarrows";
import { Xwrapper } from "react-xarrows";
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

function Roadmap({ projectConfig, onChange }) {
  function getIndexes(nodeID) {
    const str = nodeID.replace("Node_", "");
    const idxs = str.split(".");
    return idxs;
  }

  function onNodeAdd(nodeID) {
    let newProjectConfig = { ...projectConfig };
    let parentNode = { children: newProjectConfig.nodes };
    const idxs = getIndexes(nodeID);
    if (idxs.length === 0) {
      return;
    }
    idxs.map((idx) => {
      parentNode = parentNode.children[idx];
    });
    const newNode = {
      title: "New Node",
      link: "",
      children: [],
    };
    parentNode.children.push(newNode);

    onChange(newProjectConfig);
  }

  const onNodeDelete = function (nodeID) {
    let newProjectConfig = { ...projectConfig };
    let parentNode = { children: newProjectConfig.nodes };
    const idxs = getIndexes(nodeID);
    if (idxs.length === 0 || newProjectConfig.nodes <= 1) {
      return;
    }
    for (let i = 0; i < idxs.length - 1; i++) {
      parentNode = parentNode.children[idxs[i]];
    }
    parentNode.children.splice(idxs[idxs.length - 1], 1);
    onChange(newProjectConfig);
  };

  const onNodeCheck = function (nodeID) {
    console.log(nodeID);
  };

  const onCnxAdd = function () {};

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
              {projectConfig.start}
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
  for (let i = 0; i < projectConfig.nodes.length - 1; i++) {
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
      key={`arrow_Node_${projectConfig.nodes.length - 1}_container`}
      start={`Node_${projectConfig.nodes.length - 1}`}
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
              {projectConfig.end}
            </Typography>
          </div>
        ),
      }}
    />
  );
  return (
    <div className="container" id="container">
      <Xwrapper>
        {projectConfig.nodes.map((layerNode, layerNumber) => {
          return (
            <div className="layer" key={`layerdiv_${layerNumber}`}>
              <Node
                key={`Node_${layerNumber}`}
                nodeID={`Node_${layerNumber}`}
                node={layerNode}
                parent=""
                level={0}
                onAdd={onNodeAdd}
                onDelete={onNodeDelete}
                onCheck={onNodeCheck}
              />
            </div>
          );
        })}
        {connections}
      </Xwrapper>
    </div>
  );
}

Roadmap.propTypes = {
  nodes: PropTypes.array,
};

export default Roadmap;
