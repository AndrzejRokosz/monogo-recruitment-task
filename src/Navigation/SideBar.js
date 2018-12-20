import React from 'react'
import { Drawer} from 'material-ui';



const SideBar = (props) => (
    <Drawer
        docked={false}
        width={200}
        open={props.open}
    >
        {props.children}
    </Drawer>
)
export default SideBar