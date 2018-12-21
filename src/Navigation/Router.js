import React from 'react'
import Navigation from './Navigation'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import ListView from '../View/ListView'
import AboutView from '../View/AboutView'
import MenuItem from 'material-ui/MenuItem';

const style = {
    link: {
        textDecoration: 'none'
    }
}

class Router extends React.Component {
    state = {
        title: 'My fetching users app for Monogo ',
        isDrawerOpen: false
    }

    toggleDrawer = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
    handleClose = () => this.setState({ isDrawerOpen: false })

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation
                        title={this.state.title}
                        onLeftIconButtonClick={this.toggleDrawer}
                        open={this.state.isDrawerOpen}
                    >
                        <Link
                            style={style.link}
                            onClick={this.handleClose}
                            to='/'>
                            <MenuItem>List</MenuItem>
                        </Link>
                        
                        <Link
                            style={style.link}
                            onClick={this.handleClose}
                            to='/about'>
                            <MenuItem>About</MenuItem>
                        </Link>
                    </Navigation>

                    <Route path="/" exact component={ListView} />
                    <Route path="/list" exact component={ListView} />
                    <Route path="/list/:userId" component={ListView}/>
                    <Route path="/about" component={AboutView} />
                </div>
            </BrowserRouter>
        )
    }
}
export default Router