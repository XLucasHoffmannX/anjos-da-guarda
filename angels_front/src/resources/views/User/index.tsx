import React, { useContext } from 'react'
import { ContextState } from '../../../context/DataProvider';
import Wrapper from '../../components/layout/Wrapper'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './user.css';

export default function User() {
    const state: any = useContext(ContextState);
    const [userData] = state.userApi.userInfo;
    console.log(userData);


    return (
        <Wrapper title={'Meu Perfil'} welcome={false}>
            <div className='user_box'>
                <div className='box_user_config my-4'>
                    <div className='box_user_config_avatar'>
                        <div className='box_user_config_avatar_image' title='Editar imagem'>
                            <Avatar style={{ width: '100px', height: '100px' }} src={userData.image}>
                                N
                            </Avatar>
                        </div>
                        <div className='box_user_config_edit_link'>
                            <Link to="">Editar imagem</Link>
                        </div>
                    </div>
                    <div className='box_user_config_info'>
                        <div className='box_user_config_info_title'>
                            <h2 title={userData.name}>{userData.name}</h2>
                            <span>{userData.email}</span>
                        </div>
                        <div className='box_user_config_info_card'>
                            <span>{userData.email}</span>
                            <span>Cpf: 999.999.999-99</span>
                            <span>Senha: ******</span>
                            <div className='box_user_config_info_card_edit'>
                                <Link to="">Editar meus dados</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box_user_archives mt-4'>
                    <h2>Gerenciar Arquivos</h2>
                    <div className='box_user_archives_card'>
                        <div className='box_user_archives_filter'>
                            <div className='box_user_archives_filter_search'>
                                <div className='search_input'>
                                    <input type="text" placeholder='Buscar' />
                                </div>
                            </div>
                            <Link to="#" className='btn_confirm btn btn-sm btn-outline-primary ms-2'>Adicionar Arquivo +</Link>
                        </div>
                        <div className='box_user_archives_table'>
                            <table className="table table-striped table-sm w-100 my-4">
                                <thead className='table_archives'>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Tamanho</th>
                                        <th scope="col">Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>arquivo.pdf</td>
                                        <td>11/10/2022</td>
                                        <td>12kb</td>
                                        <td className='action_table_group'>
                                            <div className='btn-group mr-2'>
                                                <Link to="#" className='btn btn-sm btn-outline-danger'>Remover</Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
