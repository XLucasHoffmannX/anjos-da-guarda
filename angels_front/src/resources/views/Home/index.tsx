import React, { SyntheticEvent } from 'react'
import { Auth } from '../../../app/api/Auth';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import { AuthInterface } from '../../../types/interfaces/auth.interface.';

export default function Home() {
  const auth = new Auth();
  const [login, setLogin] = React.useState<AuthInterface>({
    email: '',
    password: ''
  })

  const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, login, setLogin);

  const handleAuthSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    auth.set('/auth/login', login);
  }

  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1 className='mt-4'>Login</h1>
        <form onSubmit={handleAuthSubmit}>
          <div className='form-group mt-4'>
            <input type="email" className='form-control' placeholder='Email' name='email' value={login.email} onChange={changeInput} required />
          </div>
          <div className='form-group mt-4'>
            <input type="password" className='form-control' placeholder='Senha' name='password' value={login.password} onChange={changeInput} required />
          </div>
          <div className='d-flex mt-4'>
            <button className='btn btn-primary'>Entrar</button>
          </div>
        </form>
      </div>
    </>
  )
}
