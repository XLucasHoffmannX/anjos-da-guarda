import React from 'react'
import Wrapper from '../../components/layout/Wrapper';
import { Link } from 'react-router-dom';

import './users.css';

export default function Users() {
    return (
        <Wrapper title={'Usuários'}>
            <div className='users_box'>
                <div className='users_box_actions_btns mt-4'>
                    <div className='search_input ' style={{ width: "350px" }}>
                        <input type="text" placeholder='Buscar' />
                    </div>
                    <Link to="#" className='btn btn-sm btn-outline-primary'>Adicionar Usuário +</Link>
                </div>
                <div className='table-responsive'>
                    <table className="table table-striped table-sm w-100 my-4">
                        <thead className='table'>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Atribuição</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Lucas Henrique Hoffmann de Lima</td>
                                <td>henriquelucashoffmann@gmail.com</td>
                                <td>Assistente Social - 1</td>
                                <td className='action_table_group'>
                                    <div className='btn-group mr-2'>
                                        <Link to="#" className='btn btn-sm btn-outline-primary'>Editar</Link>
                                        <Link to={`/users/a/edit`} className='btn btn-sm btn-outline-danger ms-2'>Apagar</Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    )
}
