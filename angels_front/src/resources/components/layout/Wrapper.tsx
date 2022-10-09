import React, { useContext } from 'react';

import './wrapper.css';
import LogoAngels from '../../assets/images/logo.svg';
import { MdOutlineChevronLeft } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Avatar, MenuItem, Menu, Box, Badge } from '@material-ui/core';
import { ContextState } from '../../../context/DataProvider';
import { MdOutlineNotifications } from 'react-icons/md';
import { HttpAuth } from '../../../app/api/Http';
import { Link } from 'react-router-dom';

type Props = {
    children?: React.ReactNode,
    title: string
}

const Wrapper: React.FC<Props> = ({ children, title }: any) => {
    const state: any = useContext(ContextState);
    const [userData, setUserData] = state.userApi.userInfo;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await HttpAuth.get("/auth/user");

                if (res.data) {
                    setUserData(res.data);
                }
            } catch (error) {
                if (error) throw error;
            }
        }

        getUser();
    }, [setUserData]);

    return (
        <div className='app_box'>
            <div className='nav_box'>
                <div className='nav_box_top'>
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
                            <NavLink to="/users" activeClassName='active_list'>Usuários</NavLink>
                        </span>
                        <span>
                            <NavLink to="/perfil" activeClassName='active_list'>Meu Perfil</NavLink>
                        </span>
                    </div>
                </div>
                <div className='nav_box_bottom'>
                    <div className='nav_list'>
                        <span>
                            <NavLink
                                onClick={async () => {
                                    await HttpAuth.post("/auth/logout").then(res => {
                                        if (res.status === 200) window.location.href = '/'
                                    });
                                    localStorage.removeItem('primaryLogin');
                                }}
                                to="/logout" activeClassName='active_list'>Sair</NavLink>
                        </span>
                    </div>
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
                                alt={userData.name && userData.name}
                                src={userData.image && userData.image}
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
                                <MenuItem onClick={handleClose}>
                                    <Link style={{textDecoration: 'none', color: '#000'}} to="/perfil">Meu Perfil</Link>
                                </MenuItem>
                                <MenuItem onClick={async () => {
                                    handleClose();
                                    await HttpAuth.post("/auth/logout").then(res => {
                                        if (res.status === 200) window.location.href = '/'
                                    });
                                    localStorage.removeItem('primaryLogin');
                                }}>Sair</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className='children_box container-fluid"'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Wrapper;
