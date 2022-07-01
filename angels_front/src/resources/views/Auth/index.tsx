import { useState } from 'react';
import BackAuth from '../../assets/images/back-image-auth.svg';
import TitleAuth from '../../assets/images/title-auth.svg';

import './auth.css';

export default function Auth() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
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
                  <div className='input_area_auth w-100'>
                    <div className='form-control-group'>
                      <input type="text" placeholder='Email' />
                    </div> 
                    <div className='form-control-group'>
                      <input type="text" placeholder='Senha de acesso' />
                    </div>
                  </div>
                  :
                  null
              }
              <span className='btn_access_primary d-flex align-items-center justify-content-center mt-3' onClick={() => handleOpen()}>Acessar</span>
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
    </>
  )
}
