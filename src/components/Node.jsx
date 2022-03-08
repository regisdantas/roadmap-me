import React from "react";
import Xarrow from "react-xarrows";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

import "./Node.css";

function Node ({ nodeID, node, parent, level}) {
  const nodeClass=(level==0?"mainNode":"childNode")
  let leftChildren = [];
  let rightChildren = [];
  node.children.map((child, idx) => {
    if ( (parent === "right" || idx%2 === 0) && parent !== "left") {
      leftChildren.push(<Node nodeID={`${nodeID}.${idx}`} node={child} parent="right" level={level+1}></Node>);
    } else {
      rightChildren.push(<Node nodeID={`${nodeID}.${idx}`} node={child} parent="left" level={level+1}></Node>);
    }
  })
  return (
    <div className="nodeGrid">
      <div id="leftChildGrid" className="childGrid">
      {leftChildren.map(child => child)}
    </div>
      <div className={nodeClass} id={nodeID}>
        <Card style={{ width: 300 }}>
        <CardContent style={{ padding: 0 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {node.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {nodeID}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {parent}
          </Typography>
        </CardContent>
      </Card>
    </div>
    <div id="rightChildGrid" className="childGrid">
        {rightChildren.map(child => child)}
      </div>
  </div>
  );
}

export default Node;