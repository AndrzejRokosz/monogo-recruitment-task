import React from 'react';
import { Drawer } from 'material-ui';

const SideBar = (props) => (
    <Drawer
        width={200}
        open={props.open}
    >
        {props.children}
    </Drawer>
)
export default SideBar;