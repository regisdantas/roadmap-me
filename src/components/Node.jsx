import React from "react";
import Xarrow from "react-xarrows";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

import "./Node.css";

function Node ({ nodeID, title, link }) {
  // const boxRef = React.useRef();
  return (
    <div className="node" id={nodeID}>
      <Card style={{ width: 300 }}>
      <CardContent style={{ padding: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {nodeID}
        </Typography>
      </CardContent>
    </Card>
  </div>
        
  );
}

export default Node;