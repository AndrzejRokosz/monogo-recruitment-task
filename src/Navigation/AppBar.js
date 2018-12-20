import React from 'react'
import AppBar from 'material-ui/AppBar'

const MyAppBar =(props)=>(
    <AppBar
        title={props.title}
        onLeftIconButtonClick={props.onLeftIconButtonClick}
    />   
)
export default MyAppBar