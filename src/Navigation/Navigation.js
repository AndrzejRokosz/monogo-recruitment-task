import React from 'react'

import MyAppBar from './AppBar';
import SideBar from './SideBar';

const Navigation=(props)=>(
<div>
    <MyAppBar
    title={props.title}
    onLeftIconButtonClick={props.onLeftIconButtonClick}
    />
    <SideBar
    open={props.open}
    >
        {props.children}
    </SideBar>
</div>
)

export default Navigation