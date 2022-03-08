import React from "react";
import Xarrow from "react-xarrows";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

import "./Node.css";

function Node ({ nodeID, node, parent, level}) {
  const nodeClass=(level===0?"mainNode":"childNode")
  let leftChildren = [];
  let rightChildren = [];
  let arrows = [];
  node.children.map((child, idx) => {
    if ( (parent === "right" || idx%2 === 0) && parent !== "left") {
      leftChildren.push(<Node key={`${nodeID}.${idx}`} nodeID={`${nodeID}.${idx}`} node={child} parent="right" level={level+1}></Node>);
      arrows.push(<Xarrow key={`arrow_${nodeID}_${nodeID}.${idx}`}
        start={nodeID}	
        end={`${nodeID}.${idx}`}
        showHead={false}
        showTail={false}
        dashness={{animation: 1}}
        path="smooth"
        startAnchor="left"
        endAnchor="right"
      />);
    } else {
      rightChildren.push(<Node key={`${nodeID}.${idx}`} nodeID={`${nodeID}.${idx}`} node={child} parent="left" level={level+1}></Node>);
      arrows.push(<Xarrow key={`arrow_${nodeID}_${nodeID}.${idx}`}
        start={nodeID}	
        end={`${nodeID}.${idx}`}
        showHead={false}
        showTail={false}
        dashness={{animation: 1}}
        path="smooth"
        startAnchor="right"
        endAnchor="left"
      />);
    }
  })
  return (
    <div className="nodeGrid">
      <div id="leftChildGrid" className="childGrid">
      {leftChildren.map(child => child)}
    </div>
      <div className={nodeClass} >
        <Card id={nodeID} variant="outlined" style={{ padding: 10 }}>
        <CardContent style={{ padding: 0 }}>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {node.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
    <div id="rightChildGrid" className="childGrid">
        {rightChildren.map(child => child)}
    </div>
    {arrows}
  </div>
  );
}

export default Node;