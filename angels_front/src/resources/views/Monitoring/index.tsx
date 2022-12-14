import React from 'react'
import { Link } from 'react-router-dom';
import Wrapper from '../../components/layout/Wrapper'
import { Chip } from '@material-ui/core';

import './monitor.css';

export default function Monitoring() {
    let alarmTime: any = '23:06';

    console.log(alarmTime);

    setInterval(() => {
        let date = new Date(),
            h: any = date.getHours(),
            m: any = date.getMinutes();

        // h = h === 0 ? h = 12 : h;
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;

        let time = `${h}:${m}`;

        if (alarmTime === time) {
            console.log('alarme');
        }
    });

    return (
        <Wrapper title='Monitoramento' welcome={false}>
            <div className='monitor_display'>
                <div className='box_control_times'>
                    <div className='box_control_times_header'>
                        <h3>Ordem tratamentos</h3>
                        <Link to="#" onClick={() => {
                            document.location.href = "/monitor"
                        }}>Atualizar</Link>
                    </div>
                    <div className='box_control_lim'>
                        <Chip label="Monitor atual" color='primary' />
                        <Chip label="Concluidos do dia" style={{ background: 'var(--bs-blue)', color: 'var(--white)' }} />
                        <Chip label="Não finalizados" style={{ background: 'var(--red)', color: 'var(--white)' }} />
                    </div>
                    <div className='monitor_box_actions_btns my-4'>
                        <div className='search_input ' style={{ width: "350px" }}>
                            <input type="text" placeholder='Buscar por paciente' name='term' />
                        </div>
                        <div className='search_input ' style={{ width: "350px" }}>
                            <select className='form-control' name="patient_id">
                                <option selected disabled hidden value={0}>Selecione o paciente</option>
                            </select>
                        </div>

                    </div>
                    <div className='box_control_times_content'>
                        <div className='card_order'>
                            <div className='card_order_div'>
                                <h2>Horário</h2>
                                <span>11:22</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Paciente</h2>
                                <span>Lucas Henrique</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Status</h2>
                                <span className='badge bg-warning text-wrap'>Aguardando</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Medicação</h2>
                                <span>Dipirona</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Ação</h2>
                                <span className='btn btn-sm btn-outline-primary'>Confirmar</span>
                            </div>
                        </div>
                        <div className='card_order'>
                            <div className='card_order_div'>
                                <h2>Horário</h2>
                                <span>11:22</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Paciente</h2>
                                <span>Lucas Henrique</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Status</h2>
                                <span className='badge bg-primary text-wrap'>Concluido</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Medicação</h2>
                                <span>Dipirona</span>
                            </div>
                            <div className='card_order_div'>
                                <h2>Ação</h2>
                                <span className='btn btn-sm btn-outline-primary'>Confirmar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
