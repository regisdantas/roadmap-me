import React from "react";
import Xarrow from "react-xarrows";
import { useXarrow } from "react-xarrows";

import {
  CheckCircleTwoTone,
  AddCircleTwoTone,
  DeleteTwoTone,
} from "@mui/icons-material";

import { Paper, Typography, IconButton } from "@mui/material";

import "./Node.css";

const arrowProps = {
  showHead: false,
  showTail: false,
  dashness: { animation: 1 },
  path: "smooth",
};

function Node({
  nodeID,
  node,
  parent,
  level,
  onClick,
  onAdd,
  onDelete,
  onCheck,
  onChangeNode,
}) {
  if (node.checked === undefined) {
    node.checked = false;
  }
  const updateXarrow = useXarrow();
  const nodeClass = level === 0 ? "mainNode" : "childNode";
  let leftChildren = [];
  let rightChildren = [];
  let arrows = [];
  node.children.map((child, idx) => {
    if ((parent === "right" || idx % 2 === 0) && parent !== "left") {
      leftChildren.push(
        <Node
          key={`${nodeID}.${idx}`}
          nodeID={`${nodeID}.${idx}`}
          node={child}
          parent="right"
          level={level + 1}
          onClick={onClick}
          onAdd={onAdd}
          onDelete={onDelete}
          onCheck={onCheck}
          onChangeNode={onChangeNode}
        ></Node>
      );
      arrows.push(
        <Xarrow
          {...arrowProps}
          key={`arrow_${nodeID}_${nodeID}.${idx}`}
          start={nodeID}
          end={`${nodeID}.${idx}`}
          startAnchor="left"
          endAnchor="right"
        />
      );
    } else {
      rightChildren.push(
        <Node
          key={`${nodeID}.${idx}`}
          nodeID={`${nodeID}.${idx}`}
          node={child}
          parent="left"
          level={level + 1}
          onClick={onClick}
          onAdd={onAdd}
          onDelete={onDelete}
          onCheck={onCheck}
          onChangeNode={onChangeNode}
        ></Node>
      );
      arrows.push(
        <Xarrow
          {...arrowProps}
          key={`arrow_${nodeID}_${nodeID}.${idx}`}
          start={nodeID}
          end={`${nodeID}.${idx}`}
          startAnchor="right"
          endAnchor="left"
        />
      );
    }
  });
  return (
    <div className="nodeGrid">
      <div id="leftChildGrid" className="childGrid">
        {leftChildren.map((child) => child)}
      </div>
      <div className={nodeClass}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            position: "relative",
            top: "16px",
            right: "-12px",
          }}
        >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="check"
            sx={{ mr: 0 }}
            onClick={() => onCheck(nodeID)}
          >
            <CheckCircleTwoTone
              color="secondary"
              fontSize="small"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            />
          </IconButton>

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="delete"
            sx={{ mr: 0 }}
            onClick={() => onDelete(nodeID)}
          >
            <DeleteTwoTone
              color="error"
              fontSize="small"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            />
          </IconButton>

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 0 }}
            onClick={() => onAdd(nodeID)}
          >
            <AddCircleTwoTone
              color="success"
              fontSize="small"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            />
          </IconButton>
        </div>
        <Paper
          className="Paper"
          id={nodeID}
          variant="outlined"
          sx={{
            backgroundColor: node.checked
              ? "gray"
              : level > 0
              ? "yellow"
              : "gold",
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
          style={{
            minWidth: "100px",
            padding: "5px 10px 0px",
            border: "3px solid black",
          }}
          onClick={() => {
            onClick(
              node.checked,
              node.title,
              atob(node.content),
              () => onCheck(nodeID),
              (newTitle, newContent) =>
                onChangeNode(nodeID, newTitle, newContent)
            );
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              textDecoration: node.checked ? "line-through" : "none",
            }}
            color="text.primary"
            gutterBottom
          >
            {node.title}
          </Typography>
        </Paper>
      </div>
      <div id="rightChildGrid" className="childGrid">
        {rightChildren.map((child) => child)}
      </div>
      {arrows}
    </div>
  );
}

export default Node;
