import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { HttpAuth } from '../../../app/api/Http';
import { MdOutlineChevronLeft } from 'react-icons/md';
import LogoAngels from '../../assets/images/logo.svg';
import { ContextState } from '../../../context/DataProvider';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';

import './nav.css';

export default function Nav() {
    const state: any = useContext(ContextState);
    const [userData] = state.userApi.userInfo;

    return (
        <>
            {
                userData.length !== 0 &&
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
                                <Accordion className='accordion_nav'>
                                    <AccordionSummary
                                        expandIcon={<MdOutlineChevronLeft style={{ rotate: '-90deg' }} />}
                                    >
                                        <span>Pacientes</span>
                                    </AccordionSummary >
                                    <AccordionDetails className='accordion_details_nav'>
                                        <NavLink to="/patients" activeClassName='active_list'>Pacientes</NavLink>
                                        <NavLink to="/create-patient" activeClassName='active_list'>Criar pacientes</NavLink>
                                    </AccordionDetails>
                                </Accordion>
                            </span>
                            <span>
                                <Accordion className='accordion_nav'>
                                    <AccordionSummary
                                        expandIcon={<MdOutlineChevronLeft style={{ rotate: '-90deg' }} />}
                                    >
                                        <span>Usuários</span>
                                    </AccordionSummary >
                                    <AccordionDetails className='accordion_details_nav'>
                                        <NavLink to="/users" activeClassName='active_list'>Usuários</NavLink>
                                        <NavLink to="/create-user" activeClassName='active_list'>Criar usuários</NavLink>
                                    </AccordionDetails>
                                </Accordion>
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
            }
        </>
    )
}
