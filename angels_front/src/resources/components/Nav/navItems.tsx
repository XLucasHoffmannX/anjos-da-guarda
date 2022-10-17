import React, { SyntheticEvent } from 'react'
import { NavLink } from 'react-router-dom';
import { HttpAuth } from '../../../app/api/Http';
import { MdOutlineChevronLeft } from 'react-icons/md';
import LogoAngels from '../../assets/images/logo.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Links } from '../../../app/api/NavItems';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';

export default function NavItems() {
    const arrayNavItems = Links;
    const [arrayTerm, setArrayTerm] = React.useState<any>([]);

    const [search, setSearch] = React.useState({
        term: ''
    });

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, search, setSearch);

    function searchFilter(arr: any, s: any) {
        let matches = [], i, key;

        for (i = arr.length; i--;)
            for (key in arr[i]) {
                if (arr[i].hasOwnProperty(key) && arr[i][key].indexOf(s) > -1)
                    matches.push(arr[i]);
            }
        return matches;
    };

    React.useEffect(() => {
        if (search.term) {
            const resultSearch = searchFilter(arrayNavItems, search.term);
            setArrayTerm(resultSearch);
        }
    }, [setArrayTerm, arrayNavItems, search.term])

    return (
        <>
            <div className='nav_box_top'>
                <div className='nav_box_title mt-4'>
                    <img src={LogoAngels} alt="logo" />
                </div>
                <div className='nav_box_search mt-4'>
                    <input type="text" placeholder='Buscar ...' name='term' value={search.term} onChange={changeInput} />
                </div>
                <div className='nav_list'>
                    {
                        search.term ?
                            arrayTerm.map((term: any, key: any) => (
                                <span key={key}>
                                    <NavLink
                                        onClick={() => search.term = ''}
                                        to={term.url} activeClassName='active_list'>{term.name}</NavLink>
                                </span>
                            ))
                            :
                            <>
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
                                    <Accordion className='accordion_nav'>
                                        <AccordionSummary
                                            expandIcon={<MdOutlineChevronLeft style={{ rotate: '-90deg' }} />}
                                        >
                                            <span>Monitoramento Diário</span>
                                        </AccordionSummary >
                                        <AccordionDetails className='accordion_details_nav'>
                                            <NavLink to="/m" activeClassName='active_list'>Monitoramento</NavLink>
                                            <NavLink to="/m1" className="mt-1" activeClassName='active_list'>Controle de Tratamento</NavLink>
                                        </AccordionDetails>
                                    </Accordion>
                                </span>
                                <span>
                                    <Accordion className='accordion_nav'>
                                        <AccordionSummary
                                            expandIcon={<MdOutlineChevronLeft style={{ rotate: '-90deg' }} />}
                                        >
                                            <span>Medicamentos</span>
                                        </AccordionSummary >
                                        <AccordionDetails className='accordion_details_nav'>
                                            <NavLink to="/medicamento" activeClassName='active_list'>Gerenciar</NavLink>
                                            <NavLink to="/create-medicamento" activeClassName='active_list'>Criar medicamento</NavLink>
                                        </AccordionDetails>
                                    </Accordion>
                                </span>
                                <span>
                                    <Accordion className='accordion_nav'>
                                        <AccordionSummary
                                            expandIcon={<MdOutlineChevronLeft style={{ rotate: '-90deg' }} />}
                                        >
                                            <span>Controle Diário</span>
                                        </AccordionSummary >
                                        <AccordionDetails className='accordion_details_nav'>
                                            <NavLink to="/control" activeClassName='active_list'>Gerenciar</NavLink>
                                            <NavLink to="/create-control" activeClassName='active_list'>Criar controle</NavLink>
                                        </AccordionDetails>
                                    </Accordion>
                                </span>
                                <span>
                                    <NavLink to="/perfil" activeClassName='active_list'>Meu Perfil</NavLink>
                                </span>
                            </>
                    }
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
        </>
    )
}
