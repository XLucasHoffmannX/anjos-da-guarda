import React, {SyntheticEvent} from 'react';
import { Link } from 'react-router-dom';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import Wrapper from '../../components/layout/Wrapper'

import './patients.css';

export default function Patients() {
    const [search, setSearch] = React.useState({
        term: ''
    })

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, search, setSearch);

    return (
        <Wrapper title='Pacientes'>
            <div className='patients_box'>
                <div className='patients_box_actions_btns my-4'>
                    <div className='search_input ' style={{ width: "350px" }}>
                        <input type="text" placeholder='Buscar pelo nome do paciente' name='term' value={search.term} onChange={changeInput} />
                    </div>
                    <Link to="/create-user" className='btn btn-sm btn-outline-primary'>Adicionar Paciente +</Link>
                </div>
            </div>
        </Wrapper>
    )
}
