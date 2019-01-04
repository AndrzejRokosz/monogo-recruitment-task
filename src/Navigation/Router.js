import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

import Navigation from './Navigation';
import ListView from '../View/ListView';
import AboutView from '../View/AboutView';
import NotFoundView from '../View/NotFoundView';

const style = {
    link: {
        textDecoration: 'none'
    }
}

class Router extends React.Component {
    state = {
        title: 'Fetching users app for Monogo ',
        isDrawerOpen: false
    }

    toggleDrawer = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    handleClose = () => this.setState({ isDrawerOpen: false });

    render() {
        return (
            <BrowserRouter

            >
                <div>
                    <Navigation
                        title={this.state.title}
                        onLeftIconButtonClick={this.toggleDrawer}
                        open={this.state.isDrawerOpen}
                    >
                        <Link
                            style={style.link}
                            onClick={this.handleClose}
                            to='/list'>
                            <MenuItem>List</MenuItem>
                        </Link>

                        <Link
                            style={style.link}
                            onClick={this.handleClose}
                            to='/about'>
                            <MenuItem>About</MenuItem>
                        </Link>
                    </Navigation>

                    <Switch>
                        <Route path="/" exact component={ListView} />
                        <Route path="/list" exact component={ListView} />
                        <Route path="/list/:userId([1-9]|10)" component={ListView} />
                        <Route path="/about" component={AboutView} />
                        <Route path='*' component={NotFoundView} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default Router;