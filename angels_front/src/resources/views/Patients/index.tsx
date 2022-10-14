import { CircularProgress } from '@material-ui/core';
import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { HttpAuth } from '../../../app/api/Http';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Delete from '../../components/Delete';
import Wrapper from '../../components/layout/Wrapper'
import Paginator from '../../components/Paginator';

import './patients.css';

export default function Patients() {
    const [ordem, setOrdem] = React.useState(false);
    const [patients, setPatients] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [lastPage, setlastPage] = React.useState(1);
    const [load, setLoad] = React.useState(false);
    const [cb, setCb] = React.useState(false);
    const [search, setSearch] = React.useState({
        term: ''
    })

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, search, setSearch);

    React.useEffect(() => {
        const getUsers = async () => {
            setLoad(true);
            const res = await HttpAuth.get(`/patient?page=${page}&term=${search.term}&ordem=${ordem ? 'ASC' : 'DESC'}`);

            if (res) {
                setLoad(false);
                setPatients(res.data.data);
                setlastPage(res.data.last_page);
            }

            setCb(false);
        };

        getUsers();
    }, [page, setPage, setlastPage, lastPage, cb, setCb, search, ordem]);

    return (
        <Wrapper title='Pacientes'>
            <div className='patients_box'>
                <div className='patients_box_actions_btns my-4'>
                    <div className='search_input ' style={{ width: "350px" }}>
                        <input type="text" placeholder='Buscar pelo nome do paciente' name='term' value={search.term} onChange={changeInput} />
                    </div>
                    <Link to="/create-patient" className='btn btn-sm btn-outline-primary'>Adicionar Paciente +</Link>
                </div>
                <div className='table-responsive'>
                    <span style={{ cursor: 'pointer' }} onClick={() => ordem ? setOrdem(false) : setOrdem(true)}>Ordem <b>{ordem ? 'crescente' : 'decrescente'}</b></span>
                    <span className='m-4'>Página Atual: {page}</span>
                    <span className='m-4'>Quantidade de páginas: {lastPage}</span>
                    <table className="table table-striped table-sm w-100 mt-2">
                        <thead className='table'>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Imagem</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Atribuição</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                !load &&
                                patients.map(patient => (
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td><img className='img-fluid' style={{ width: '50px' }} src={patient.image} alt={patient.name} /></td>
                                        <td>{patient.name}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.description} - {patient.role_id}</td>
                                        <td className='action_table_group'>
                                            <div className='btn-group mr-2'>
                                                <Link to={`/edit-patient/${patient.id}`} className='btn btn-sm btn-outline-primary'>Editar</Link>
                                                <Delete id={patient.id} titleMessage={patient.name} cb={setCb} endpoint={'patient'} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {load ? <div className="d-flex justify-content-center align-items-center mt-4"><CircularProgress /></div> : <Paginator page={page} setPage={setPage} lastPage={lastPage} />}
                </div>
            </div>
        </Wrapper>
    )
}
