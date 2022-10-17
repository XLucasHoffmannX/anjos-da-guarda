import React, { useContext } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import { AiOutlineReload } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { FiExternalLink } from 'react-icons/fi';
import { CgOptions } from 'react-icons/cg';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineChecklist } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './home.css';
import { ContextState } from '../../../context/DataProvider';

export default function Home() {
	const state:any = useContext(ContextState);
	const [userData] = state.userApi.userInfo;
    console.log(userData);


	return (
		<Wrapper title={userData.name} welcome={true}>
			<div className='home_box'>
				<div className='cards_home_box'>
					<div className='card_home_box'>
						<div className='card_home_box_top'>
							<div className='card_home_box_top_ico' title='Pacientes'>
								<FiUsers />
							</div>
							<div className='card_home_box_top_options' title='Opções'>
								<CgOptions />
							</div>
						</div>
						<div className='card_home_box_bottom'>
							<div className='card_home_box_bottom_info' title='Total de Pacientes'>
								<span>Total de pacientes</span>
								<h2>24</h2>
							</div>
							<div className='card_home_box_bottom_opt' title='Recarregar'>
								<AiOutlineReload />
							</div>
						</div>
					</div>
					<div className='card_home_box'>
						<div className='card_home_box_top'>
							<div className='card_home_box_top_ico' title='Aniversariantes'>
								<FaBirthdayCake />
							</div>
							<div className='card_home_box_top_options' title='Opções'>
								<CgOptions />
							</div>
						</div>
						<div className='card_home_box_bottom'>
							<div className='card_home_box_bottom_info' title='Aniversariantes'>
								<span>Aniversariante do dia</span>
								<h2>Cassio Antonio</h2>
							</div>
							<div className='card_home_box_bottom_opt' title='Ver aniversariantes'>
								<FiExternalLink />
							</div>
						</div>
					</div>
					<div className='card_home_box'>
						<div className='card_home_box_top'>
							<div className='card_home_box_top_ico' title='Atendidos'>
								<MdOutlineChecklist />
							</div>
							<div className='card_home_box_top_options' title='Opções'>
								<CgOptions />
							</div>
						</div>
						<div className='card_home_box_bottom'>
							<div className='card_home_box_bottom_info' title='Total de Pacientes'>
								<span>Pacientes Atendidos {new Date().toLocaleDateString()}</span>
								<h2>12</h2>
							</div>
							<div className='card_home_box_bottom_opt' title='Recarregar'>
								<AiOutlineReload />
							</div>
						</div>
					</div>
				</div>
				<div className='patients_box'>
					<h2 className='title_box_h2'>Pacientes</h2>
					<span className='title_box_sub'>Próximos atendimentos</span>
					<div className='search_input mt-4' style={{ width: "350px" }}>
						<input type="text" placeholder='Buscar' />
					</div>
					<div className='table-responsive'>
						<table className="table table-striped table-sm w-100 my-4">
							<thead className='table'>
								<tr>
									<th scope="col">Ordem</th>
									<th scope="col">Nome</th>
									<th scope="col">Medicação</th>
									<th scope="col">Hora Medicação</th>
									<th scope="col">Ação</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Lucas Henrique Hoffmann de Lima</td>
									<td>Parecetamol</td>
									<td>13:50</td>
									<td className='action_table_group'>
										<div className='btn-group mr-2'>
											<Link to={`/users/a/edit`} className='btn btn-sm btn-outline-secondary'>Ver paciente</Link>
											<Link to="#" className='btn btn-sm btn-outline-primary'>Confirmar</Link>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
