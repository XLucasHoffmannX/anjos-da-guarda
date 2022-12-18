import { CircularProgress } from '@material-ui/core';
import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom';
import { HttpAuth } from '../../../app/api/Http';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Delete from '../../components/Delete';
import Wrapper from '../../components/layout/Wrapper'
import Paginator from '../../components/Paginator';
import {AiFillCheckCircle} from 'react-icons/ai'

import './control.css'

export default function Control() {
    const [ordem, setOrdem] = React.useState(false);
    const [control, setControl] = React.useState<any[]>([]);
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
            const res = await HttpAuth.get(`/control?page=${page}&term=${search.term}&ordem=${ordem ? 'ASC' : 'DESC'}`);

            if (res) {
                setLoad(false);
                setControl(res.data.data);
                setlastPage(res.data.last_page);
            }

            setCb(false);
        };

        getUsers();
    }, [page, setPage, setlastPage, lastPage, cb, setCb, search, ordem]);

    return (
        <Wrapper title={'Controle de Tratamento'} welcome={false}>
            <div className='control_box_actions_btns my-4'>
                <div className='search_input ' style={{ width: "350px" }}>
                    <input type="text" placeholder='Buscar pela informação' name='term' value={search.term} onChange={changeInput} />
                </div>
                <Link to="/create-control" className='btn btn-sm btn-outline-primary'>Adicionar controle +</Link>
            </div>
            <div className='table-responsive'>
                <div className='options_table'>
                    <span style={{ cursor: 'pointer' }} onClick={() => ordem ? setOrdem(false) : setOrdem(true)}>Ordem <b>{ordem ? 'crescente' : 'decrescente'}</b></span>
                    <span className='m-4'>Página Atual: {page}</span>
                    <span className='m-4'>Quantidade de páginas: {lastPage}</span>
                </div>
                <table className="table table-striped table-sm w-100 mt-2">
                    <thead className='table'>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Tipo de tratamento</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            !load &&
                            control.map(control => (
                                <tr key={control.id}>
                                    <td>{control.id}</td>
                                    <td>{control.type_treatment}</td>
                                    <td>{ control.description ? control.description : "Nenhuma informação"}</td>
                                    <td>
                                        {control.activated}
                                        </td>
                                    <td className='action_table_group'>
                                        <div className='btn-group mr-2'>
                                            <Delete id={control.id} titleMessage={control.name} cb={setCb} endpoint={'patient'} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {load ? <div className="d-flex justify-content-center align-items-center mt-4"><CircularProgress /></div> : <Paginator page={page} setPage={setPage} lastPage={lastPage} />}
            </div>
        </Wrapper>
    )
}
