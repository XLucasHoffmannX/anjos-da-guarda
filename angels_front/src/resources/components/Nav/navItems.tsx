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

    function trimString(s: any) {
        let l = 0, r = s.length - 1;
        while (l < s.length && s[l] === ' ') l++;
        while (r > l && s[r] === ' ') r -= 1;
        return s.substring(l, r + 1);
    }

    function compareObjects(o1: any, o2: any) {
        let k = '';
        for (k in o1) if (o1[k] !== o2[k]) return false;
        for (k in o2) if (o1[k] !== o2[k]) return false;
        return true;
    }

    let objects: any = arrayNavItems;

    React.useEffect(() => {
        function itemExists(haystack: any, needle: any) {
            for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
            return false;
        }

        function searchFor(toSearch: any) {
            let results = [];
            toSearch = trimString(toSearch); // trim it
            for (let i = 0; i < arrayNavItems.length; i++) {
                for (let key in objects[i]) {
                    if (objects[i][key].indexOf(toSearch) !== -1) {
                        if (!itemExists(results, objects[i])) results.push(objects[i]);
                    }
                }
            }
            return results;
        }

        if (search.term) {
            const resultSearch = searchFor(search.term);
            setArrayTerm(resultSearch);
        }

    }, [setArrayTerm, arrayNavItems, search.term, objects])

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
                            arrayTerm.length > 0 ?
                                arrayTerm.map((term: any, key: any) => (
                                    <span key={key}>
                                        <NavLink
                                            onClick={() => search.term = ''}
                                            to={term.url} activeClassName='active_list'>{term.name}</NavLink>
                                    </span>
                                ))
                                : <span className='null_search'>Nenhum atalho encontrado!</span>
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
