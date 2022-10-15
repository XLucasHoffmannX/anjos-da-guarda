import React, { useContext } from 'react';
import {MdMenu, MdOutlineNotifications } from 'react-icons/md';
import { ContextState } from '../../../context/DataProvider';
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core';

import './nav.css';
import NavItems from './navItems';

export default function Nav() {
    const state: any = useContext(ContextState);
    const [userData] = state.userApi.userInfo;

    const OpenDock = () => {
        const event = new CustomEvent('openSide')
        window.dispatchEvent(event)
    }

    return (
        <>
            {
                userData.length !== 0 &&
                <>
                    <div className='nav_box'>
                        <NavItems />
                    </div>
                    <div className='nav_app_bar'>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static" className='nav_app_bar_box'>
                                <Toolbar variant="dense" className='d-flex align-items-center justify-content-between'>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={OpenDock}>
                                        <MdMenu />
                                    </IconButton>
                                    <IconButton edge="start" color="inherit">
                                        <MdOutlineNotifications />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </div>
                </>
            }
        </>
    )
}
