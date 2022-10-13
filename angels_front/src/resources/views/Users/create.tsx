import React, {SyntheticEvent} from 'react';
import { Avatar} from '@material-ui/core';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Wrapper from '../../components/layout/Wrapper'

import './users.css';

export default function CreateUser() {
    const [user, setUser] = React.useState({
        name: '', 
        email: '',
        description: '',
        cpf: '',
        password: '',
        image: ''
    });

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, user, setUser);

    return (
        <Wrapper title='Criar Usuário'>
            <div className='user_box'>
                <div className='form_control_angels'>
                    <form action="">
                        <h2 className='form_section mt-2'>Imagem de Perfil</h2>
                        <hr />
                        <div className='div_form_image mb-4'>
                            <Avatar className='my-2 p-2' style={{ width: '100px', height: '100px', textAlign: 'center' }} ></Avatar>
                            <input className='form-control w-50' type="file" id='formFile' />
                        </div>
                        <h2 className='form_section'>Dados gerais</h2>
                        <hr />
                        <div className='div_form'>
                            <label className="form-label">Informe nome do usuário</label>
                            <input type="text" className='form-control' placeholder='Nome' name='name' value={user.name} onChange={changeInput} required/>
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe email</label>
                            <input type="email" className='form-control' name='email' placeholder='email@email.com' value={user.email} onChange={changeInput} required/>
                        </div>
                        <div className='div_form'>
                            <label className="form-label">CPF</label>
                            <input type="text" className='form-control' placeholder='Sem pontos ou traços'name='cpf' value={user.cpf} onChange={changeInput} required/>
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe atribuição</label>
                            <input type="text" className='form-control' placeholder='Ex: Auxiliar' name='description' value={user.description} onChange={changeInput} required/>
                        </div>
                        <h2 className='form_section mt-4'>Senha e permisões</h2>
                        <hr />
                        <div className='div_form'>
                            <label className="form-label">Senha</label>
                            <input type="password" className='form-control' placeholder='Senha forte...' name='password' value={user.password} onChange={changeInput} required/>
                        </div>
                        <div className='div_form d-flex flex-row-reverse'>
                            <button className='btn btn-success mt-2'>Cadastrar Usuário</button>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}
