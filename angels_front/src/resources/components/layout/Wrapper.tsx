import React, { useContext } from 'react';

import './wrapper.css';
import { Avatar, MenuItem, Menu, Box, Badge } from '@material-ui/core';
import { ContextState } from '../../../context/DataProvider';
import { MdOutlineNotifications } from 'react-icons/md';
import { HttpAuth } from '../../../app/api/Http';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';

type Props = {
    children?: React.ReactNode,
    title: string,
    welcome: boolean
}

const Wrapper: React.FC<Props> = ({ children, title, welcome }: any) => {
    const state: any = useContext(ContextState);
    const [userData, setUserData] = state.userApi.userInfo;
    const [currentDate, setCurrentDate] = React.useState(new Date())
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
    }, [setUserData])

    return (
        <div className='app_box'>
            <div className='dash_box'>
                <div className='top_box'>
                    <div className='top_box_title'>
                        {
                            welcome ?
                                <>
                                    <h2>Bem vindo {title}!</h2>
                                    <h2 className='title_date'>{moment().locale('pt-br').format('LL')}</h2>
                                </>
                                :
                                <h2>{title}</h2>
                        }
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
                                    <Link style={{ textDecoration: 'none', color: '#000' }} to="/perfil">Meu Perfil</Link>
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
