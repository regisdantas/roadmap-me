import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import Xarrow from "react-xarrows";
import './Roadmap.css'

const arrowProps = {
  showHead: false,
  showTail: false,
  dashness: {animation: 1},
  path: "smooth",
  strokeWidth: 6
}

function Roadmap(props) {
  let connections = [];
  connections.push(<Xarrow {...arrowProps} key={`arrow_container_Node_0`}
    start={"container"}
    end={`Node_0`}
    startAnchor="top"
    endAnchor="top"
  />)
  for (let i = 0; i < props.nodes.length-1; i++) {
    connections.push(<Xarrow {...arrowProps} key={`arrow_${i}_cnx_${i+1}`}
      start={`Node_${i}`}	
      end={`Node_${i+1}`}
      startAnchor="bottom"
      endAnchor="top"
    />)
  }
  connections.push(<Xarrow {...arrowProps} key={`arrow_Node_${props.nodes.length-1}_container`}
    start={`Node_${props.nodes.length-1}`}
    end={"container"}
    startAnchor="bottom"
    endAnchor="bottom"
  />)
  return (
    <div className="container" id="container">
      {props.nodes.map((layerNode, layerNumber) => {
        return (
          <div className="layer" key={`layerdiv_${layerNumber}`}>
            <Node key={`Node_${layerNumber}`} nodeID={`Node_${layerNumber}`} node={layerNode} parent="" level={0}/>
          </div>
        )
      })}
      {connections}
    </div>
    
  )
}

Roadmap.propTypes = {
  nodes: PropTypes.array,
}

export default Roadmap
