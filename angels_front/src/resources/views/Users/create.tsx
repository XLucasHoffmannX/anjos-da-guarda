import React, { SyntheticEvent } from 'react';
import { Avatar } from '@material-ui/core';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Wrapper from '../../components/layout/Wrapper'

import './users.css';
import { HttpAuth } from '../../../app/api/Http';
import { Redirect, useParams } from 'react-router-dom';

interface Params {
    id: string
}

export default function CreateUser() {
    const { id } = useParams<Params>();
    const [image, setImage] = React.useState<any>();
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

    React.useEffect(() => {
        const getUserEdit = async () => {
            if (id) {
                const res = await HttpAuth.get(`/user/${id}`);

                if (res) {
                    setUser(res.data);
                }
            }
        };
        getUserEdit();
    }, [id])

    const upload = async (e: FileList | any) => {
        if (e === null) return;

        const data = new FormData();

        data.append('imageFile', e.files[0]);

        setImage(e.files[0])

        const res = await HttpAuth.post('/upload-image', data);

        if (res.status === 200 || res.status === 202) {
            setUser((prev: any) => { return { ...prev, image: res.data.url } });
        }
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (id) {
            setUser((prev: any) => { return { ...prev, image: image } });
            await HttpAuth.put(`/user/${id}`, {
                ...user
            }).then(res => {
                if (res) setRedirect(true);
            }).catch((error) => {
                if (error) alert(error);
            });
        } else {
            await HttpAuth.post('/user', {
                ...user
            }).then(res => {
                if (res) setRedirect(true);
            }).catch((error) => {
                if (error) alert(error);
            });
        }
    }

    if (redirect) return <Redirect to={'/users'} />;

    return (
        <Wrapper title={id ? 'Editar Usuário' : 'Criar Usuário'} welcome={false}>
            <div className='user_box'>
                <div className='form_control_angels'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='form_section mt-2'>Imagem de Perfil</h2>
                        <hr />
                        <div className='div_form_image mb-4'>
                            {
                                id ?
                                <Avatar className='my-2' style={{ width: '100px', height: '100px', textAlign: 'center', border: '1px solid var(--grey-border)' }} src={id && !image ? user.image : URL.createObjectURL(image)}></Avatar>
                                :

                                <Avatar className='my-2' style={{ width: '100px', height: '100px', textAlign: 'center', border: '1px solid var(--grey-border)' }} src={image && URL.createObjectURL(image)}></Avatar>
                            }
                            <input className='form-control w-50' name="image" type="file" onChange={e => upload(e.target)} />
                        </div>
                        <h2 className='form_section'>Dados gerais</h2>
                        <hr />
                        <div className='div_form'>
                            <label className="form-label">Informe nome do usuário</label>
                            <input type="text" className='form-control' placeholder='Nome' name='name' value={user.name || ''} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe email</label>
                            <input type="email" className='form-control' name='email' placeholder='email@email.com' value={user.email || ''} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">CPF</label>
                            <input type="text" className='form-control' placeholder='Sem pontos ou traços' name='cpf' value={user.cpf || ''} onChange={changeInput} required />
                        </div>
                        <div className='div_form'>
                            <label className="form-label">Informe atribuição</label>
                            <input type="text" className='form-control' placeholder='Ex: Auxiliar' name='description' value={user.description || ''} onChange={changeInput} required />
                        </div>
                        {
                            !id &&
                            <>
                                <h2 className='form_section mt-4'>Senha e permisões</h2>
                                <hr />
                                <div className='div_form'>
                                    <label className="form-label">Senha</label>
                                    <input type="password" className='form-control' placeholder='Senha forte...' name='password' value={user.password || ''} onChange={changeInput} required />
                                </div>
                            </>
                        }
                        <div className='div_form d-flex flex-row-reverse'>
                            <button className='btn btn-success mt-2'>{!id ? 'Cadastrar usuário' : 'Editar usuário'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}
