import React, { SyntheticEvent, useState, useContext } from 'react';
import { ContextState } from '../../../context/DataProvider';
import { AuthInterface } from '../../../types/interfaces/auth.interface.';
import BackAuth from '../../assets/images/back-image-auth.svg';
import TitleAuth from '../../assets/images/title-auth.svg';

import './auth.css';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import { Redirect } from 'react-router-dom';
import { Http } from '../../../app/api/Http';

export default function AuthView() {
    const state: any = useContext(ContextState);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const setNotify = state.notifyGeral.notify[1];
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const [login, setLogin] = React.useState<AuthInterface>({
        email: '',
        password: ''
    })

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, login, setLogin);

    const handleAuthSubmit = async () => {
        await Http.post("/auth/login", {
            ...login
        }).then((res) => {
            if (res.data) localStorage.setItem('primaryLogin', 'true');
            if (res.status === 201 || res.status === 200) setSuccess(true);
        }).catch(error => {
            setNotify({ open: true, message: 'Ocorreu um erro ao entrar!', success: false });
            if (error) throw error;
        });
    }

    const enterKey = (e: any) => {
        if (e.key === 'Enter') {
            handleAuthSubmit();
        }
    }

    const controlButton = () => {
        if (open) {
            if (login.email === '' || login.password === '') {
                setNotify({ open: true, message: 'Preencha todos os campos!', success: false });
                return setSuccess(false);
            }
            handleAuthSubmit();
        } else handleOpen();
    }

    return (
        <>
            <div className='auth_container d-flex align-items-center'>
                <div className='auth_container_control d-flex align-items-center justify-content-center'>
                    <div className='auth_control'>
                        <div className='auth_box d-flex flex-column align-items-center justify-content-center'>
                            <img className='title_auth' src={TitleAuth} alt="" />
                            <span className='mt-2 subtitle_auth'>Sistema de gerenciamento geral de pacientes</span>
                            {
                                open ?
                                    <form className='w-100' onKeyDown={enterKey}>
                                        <div className='input_area_auth w-100'>
                                            <div className='form-control-group'>
                                                <input type="email" placeholder='Email' name="email" value={login.email} onChange={changeInput} />
                                            </div>
                                            <div className='form-control-group'>
                                                <input type="password" placeholder='Senha de acesso' name="password" value={login.password} onChange={changeInput} />
                                            </div>
                                        </div>
                                    </form>
                                    :
                                    null
                            }
                            <span className='btn_access_primary d-flex align-items-center justify-content-center mt-3' onClick={controlButton} >Acessar</span>
                            <div className='auth_info_subtitle mt-2 d-flex flex-column align-items-center justify-content-center'>
                                <div className='auth_info_subtitle_first mt-2'>
                                    <span>I.L.P.I</span>
                                    <span> - Anjos da Guarda</span>
                                </div>
                                2022
                            </div>
                        </div>
                        <div className='auth_image'>
                            <img src={BackAuth} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {success && <Redirect to='/' />}
        </>
    )
}
