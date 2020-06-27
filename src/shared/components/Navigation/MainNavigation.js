import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import BackDrop from '../UIElements/BackDrop';
import './MainNavigation.css';

const MainNavigation = props => {

    let [drawer_is_open, set_drawer_is_open] = useState(false);
    function openDrawerHandler() {
        set_drawer_is_open(true);
    }
    function closeDrawerHandler() {
        set_drawer_is_open(false);
    }

    return (

        <React.Fragment>
            {drawer_is_open && <BackDrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawer_is_open} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Dashboard</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
