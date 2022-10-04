import React, { useContext } from 'react';

import './wrapper.css';
import LogoAngels from '../../assets/images/logo.svg';
import { MdOutlineChevronLeft } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Avatar, MenuItem, Menu, Box, Badge } from '@material-ui/core';
import { ContextState } from '../../../context/DataProvider';
import { MdOutlineNotifications } from 'react-icons/md';

type Props = {
    children?: React.ReactNode,
    title: string
}

const Wrapper: React.FC<Props> = ({ children, title }: any) => {
    const state: any = useContext(ContextState);
    const [userInfo] = state.userApi.userInfo;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='app_box'>
            <div className='nav_box'>
                <div className='nav_box_title mt-4'>
                    <img src={LogoAngels} alt="logo" />
                    <div className='close_fixe'>
                        <MdOutlineChevronLeft />
                    </div>
                </div>
                <div className='nav_list'>
                    <span>
                        <NavLink to="/home" activeClassName='active_list'>Dashboard</NavLink>
                    </span>
                    <span>
                        <NavLink to="/error" activeClassName='active_list'>Error</NavLink>
                    </span>
                </div>
            </div>
            <div className='dash_box'>
                <div className='top_box'>
                    <div className='top_box_title'>
                        <h2>{title}</h2>
                    </div>
                    <div className='top_box_user_container'>
                        <div className='top_box_notification'>
                            <Box sx={{ color: 'action.active' }}>
                                <Badge color="secondary" variant="dot">
                                    <MdOutlineNotifications />
                                </Badge>
                            </Box>
                        </div>
                        <div className='top_box_user_avatar'>
                            <Avatar
                                alt={userInfo.name}
                                src={userInfo.image}
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ cursor: 'pointer' }}
                            />
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                style={{ marginTop: "2.7rem" }}
                            >
                                <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
                                <MenuItem onClick={handleClose}>Sair</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Wrapper;
