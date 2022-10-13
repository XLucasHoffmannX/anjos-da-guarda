import React, { SyntheticEvent } from 'react';
import { Avatar } from '@material-ui/core';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Wrapper from '../../components/layout/Wrapper'

import './users.css';
import { HttpAuth } from '../../../app/api/Http';
import { Redirect } from 'react-router-dom';

export default function CreateUser() {
    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, user, setUser);
    const [redirect, setRedirect] = React.useState(false);
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        description: '',
        cpf: '',
        password: '',
        image: ''
    });

    const upload = async (e: FileList | any) => {
        if (e === null) return;

        const data = new FormData();

        data.append('imageFile', e.files[0]); 

        const res = await HttpAuth.post('/upload-image', data); 

        if(res.status === 200 || res.status === 202){
            setUser((prev:any)=>{return {...prev, image: res.data.url}});
            console.log(res.data.url);
            console.log(user);
        }
    }

    const handleSubmit = async(e: SyntheticEvent)=>{
        e.preventDefault();

        await HttpAuth.post('/user', {
            ...user
        }).then(res => {
            if (res) setRedirect(true);
        }).catch((error)=>{
            if(error) alert(error);
        });
    }

    if (redirect) return <Redirect to={'/users'} />;

    return (
        <Wrapper title='Criar Usuário'>
            <div className='user_box'>
                <div className='form_control_angels'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='form_section mt-2'>Imagem de Perfil</h2>
                        <hr />
                        <div className='div_form_image mb-4'>
                            <Avatar className='my-2 p-2' style={{ width: '100px', height: '100px', textAlign: 'center' }} src={user.image &&  `http://angels.api${user.image}`}></Avatar>
                            <input className='form-control w-50' type="file" onChange={e => upload(e.target)} />
                        </div>
                        <h2 className='form_section'>Dados gerais</h2>
                        <hr />
                        <div className='div_form'>
                            <label className="form-label">Informe nome do usuário</label>
                            <input type="text" className='form-control' placeholder='Nome' name='name' value={user.name} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe email</label>
                            <input type="email" className='form-control' name='email' placeholder='email@email.com' value={user.email} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">CPF</label>
                            <input type="text" className='form-control' placeholder='Sem pontos ou traços' name='cpf' value={user.cpf} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe atribuição</label>
                            <input type="text" className='form-control' placeholder='Ex: Auxiliar' name='description' value={user.description} onChange={changeInput} required />
                        </div>
                        <h2 className='form_section mt-4'>Senha e permisões</h2>
                        <hr />
                        <div className='div_form'>
                            <label className="form-label">Senha</label>
                            <input type="password" className='form-control' placeholder='Senha forte...' name='password' value={user.password} onChange={changeInput} required />
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
