import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Typography} from '@mui/material';

function Header(props) {
  return (
    <Toolbar sx={{ 
        backgroundColor: 'black',
        position: "sticky",
        top: 0,
        zIndex: '2'
    }}>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', position: 'relative', left: '20%'}} color="white" gutterBottom>
            {"<roadmap-diagrams/>"}
        </Typography>
    </Toolbar>
  )
}

Header.propTypes = {}

export default Header
