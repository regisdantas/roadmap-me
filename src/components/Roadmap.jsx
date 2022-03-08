import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import Xarrow from "react-xarrows";
import './Roadmap.css'

function Roadmap(props) {
  let connections = [];
  for (let i = 0; i < props.nodes.length-1; i++) {
    connections.push(<Xarrow key={`arrow_${i}_cnx_${i+1}`}
      start={`Node_${i}`}	
      end={`Node_${i+1}`}
    />)
  }
  return (
    <div className="container">
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
