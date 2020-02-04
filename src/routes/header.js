import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userActions';

class Header extends Component {
    componentWillMount() {
        this.props.getUser();
    }
    componentWillReceiveProps(nextProps) {
        nextProps.getUser();
    }
    render() {
        return (
            <div className="container-fluid">
                <header>
                    <nav>
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/">KALORAAT</Link>
                                </Navbar.Brand>

                                <Navbar.Toggle />
                            </Navbar.Header>

                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem>
                                        <NavLink exact to="/" activeClassName="active">
                                            Home
                                        </NavLink>
                                    </NavItem>
                                    {this.props.user === null ? (
                                        <NavItem>
                                            <NavLink to="/login" activeClassName="active">
                                                Login
                                            </NavLink>
                                        </NavItem>
                                    ) : (
                                        <NavItem>
                                            <NavLink
                                                to="#"
                                                activeClassName="active"
                                                onClick={() => {
                                                    this.props.logout();
                                                }}
                                            >
                                                Logout
                                            </NavLink>
                                        </NavItem>
                                    )}
                                    <NavItem>
                                        {this.props.user ? (
                                            <NavLink exact to="/admin" activeClassName="active">
                                                Admin
                                            </NavLink>
                                        ) : (
                                            ''
                                        )}
                                    </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </nav>
                </header>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser, logout })(Header);
