import React from 'react';

import './wrapper.css';
import LogoAngels from '../../assets/images/logo.svg';
import { MdOutlineChevronLeft } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

type Props = {
    children?: React.ReactNode,
    title: string
}

const Wrapper: React.FC<Props> = ({ children, title }: any) => {
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
                <h1 className='m-5'>{title}</h1>
            </div>
        </div>
    )
}


export default Wrapper;
