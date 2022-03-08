import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import Xarrow from "react-xarrows";
import './Roadmap.css'

function Roadmap(props) {
  return (
    <div className="container">
      {props.nodes.map((layerNode, layerNumber) => {
        return (
          <div className="layer" key={`layerdiv_${layerNumber}`}>
            <Node nodeID={`Node_${layerNumber}`} node={layerNode} parent="" level={0}/>
          </div>
        )
      })}
      {/* {
        nodeList.map((node) => { return (
          node.connect.map((connection, idx) => { return (
            <Xarrow key={`arrow_${node.id}_cnx_${idx}`}
              start={node.id}
              end={connection}
            />
          )})
        )})
    } */}
    </div>
    
  )
}

Roadmap.propTypes = {
  nodes: PropTypes.array,
}

export default Roadmap
