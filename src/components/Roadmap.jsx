import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Connection from "./Connection";
import { Xwrapper } from "react-xarrows";
import "./Roadmap.css";

function Roadmap({ projectConfig, onChange, onNodeClick }) {
  const newNode = {
    title: "New Node",
    content: "",
    children: [],
  };

  function getIndexes(nodeID) {
    const str = nodeID.replace("Node_", "");
    const idxs = str.split(".");
    return idxs;
  }

  function onNodeAdd(nodeID) {
    const idxs = getIndexes(nodeID);
    if (idxs.length === 0) {
      return;
    }
    let parentNode = { children: projectConfig.nodes };
    idxs.map((idx) => {
      parentNode = parentNode.children[idx];
    });
    parentNode.children.push(newNode);
    onChange(projectConfig);
  }

  const onNodeDelete = function (nodeID) {
    const idxs = getIndexes(nodeID);
    if (idxs.length === 0 || projectConfig.nodes <= 1) {
      return;
    }
    let parentNode = { children: projectConfig.nodes };
    for (let i = 0; i < idxs.length - 1; i++) {
      parentNode = parentNode.children[idxs[i]];
    }
    parentNode.children.splice(idxs[idxs.length - 1], 1);
    onChange(projectConfig);
  };

  const onNodeCheck = function (nodeID) {
    console.log(nodeID);
  };

  const onCnxAdd = function (start, end) {
    if (start === "container") {
      projectConfig.nodes = [newNode, ...projectConfig.nodes];
    } else if (end === "container") {
      projectConfig.nodes.push(newNode);
    } else {
      let idx = getIndexes(start);
      projectConfig.nodes.splice(Number(idx[0]) + 1, 0, newNode);
    }
    onChange(projectConfig);
  };

  let connections = [];
  connections.push(
    <Connection
      key={"cnx_container_Node_0"}
      start={"container"}
      end={`Node_0`}
      startAnchor="top"
      endAnchor="top"
      color="gray"
      middleLabel={projectConfig.start}
      onAdd={onCnxAdd}
    />
  );
  for (let i = 0; i < projectConfig.nodes.length - 1; i++) {
    connections.push(
      <Connection
        key={`cnx_Node_${i}_Node_${i + 1}`}
        start={`Node_${i}`}
        end={`Node_${i + 1}`}
        startAnchor="bottom"
        endAnchor="top"
        onAdd={onCnxAdd}
      />
    );
  }
  connections.push(
    <Connection
      key={`cnx_Node_${projectConfig.nodes.length - 1}_container`}
      start={`Node_${projectConfig.nodes.length - 1}`}
      end={"container"}
      startAnchor="bottom"
      endAnchor="bottom"
      color="gray"
      middleLabel={projectConfig.end}
      onAdd={onCnxAdd}
    />
  );
  return (
    <div className="container" id="container">
      <Xwrapper>
        {connections}
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
                onClick={onNodeClick}
              />
            </div>
          );
        })}
      </Xwrapper>
    </div>
  );
}

Roadmap.propTypes = {
  nodes: PropTypes.array,
};

export default Roadmap;
