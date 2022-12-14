import * as React from 'react';
import { Tab, Box, Typography, Tabs } from '@material-ui/core';
import Wrapper from '../../components/layout/Wrapper';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import { HttpAuth } from '../../../app/api/Http';
import { ContextState } from '../../../context/DataProvider';
import { BsPlus } from 'react-icons/bs';
import { HiMinusSm } from 'react-icons/hi';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function CreateControl() {
    const state: any = React.useContext(ContextState);
    const setModal = state.modalsGeral.modals[1];
    const [userData] = state.userApi.userInfo;
    const [created, setCreated] = React.useState<boolean>(false);

    const [controlAtt, setControlAtt] = React.useState<any>({
        typeControl: 0,
        frequency: 0,
        patient_id: 0,
        medicamento: '',
        description: '',
        numberAdd: ''
    });

    const [med, setMed] = React.useState<number>(0);
    const [patients, setPatients] = React.useState<any[]>([]);

    const [numberdata, setNumberData] = React.useState<any[]>([]);

    const changeInput = (e: React.SyntheticEvent) => changeInputRecursive(e, controlAtt, setControlAtt);
    const [value, setValue] = React.useState(0);

    const insertNumberData = () => {
        if (!controlAtt.numberAdd) return console.log('');
        const itensCopy: any[] = Array.from(numberdata);
        itensCopy.push({ freq: controlAtt.numberAdd });
        setNumberData(itensCopy);
    }

    const removeNumberData = (index: any) => {
        const itensCopy = Array.from(numberdata);
        itensCopy.splice(index, 1)
        setNumberData(itensCopy)
    }

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    React.useEffect(() => {

        const getAllPatients = async () => {
            const res = await HttpAuth.get(`/patient-all`);

            setPatients(res.data);
        };

        getAllPatients();

        console.log(created);


        if (created) {
            setModal({
                open: true,
                message: 'Controle criado, para visualizar e gerenciar acesse o Monitor Diário',
                title: 'Controle Criado',
                success: true,
                link: '/create-control'
            })
        }

    }, [created, setModal]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log('criando');
        const param = {
            user_created: userData.id,
            patient_id: controlAtt.patient_id,
            medicamento: controlAtt.medicamento,
            description: controlAtt.description,
        }

        console.log(controlAtt.numberAdd);
        console.log(param.medicamento);

        if (controlAtt.numberAdd && param.medicamento) {
            setCreated(false);
            console.log('entrei passo 1');

            await HttpAuth.post('/control', { ...param })
                .then(async (res) => {
                    if (res.data.id) {
                        console.log('entrei passo 1');
                        const idControl = res.data.id;

                        if (controlAtt.numberAdd && numberdata.length <= 0) {
                            await HttpAuth.post('/frequency', {
                                control_id: idControl,
                                time: controlAtt.numberAdd
                            }).then(res => {
                                if (res.data) setCreated(true);
                            });
                        } else {
                            for (let e of numberdata) {
                                await HttpAuth.post('/frequency', {
                                    control_id: idControl,
                                    time: e.freq
                                });
                            }
                            setCreated(true);
                        }
                    }
                });
        }
    }

    return (
        <Wrapper title='Criar Controle' welcome={false}>
            <div className='control_box'>
                <div className='form_control_angels mt-4'>
                    <form action="">
                        <h2 className='form_section mt-2'>Controle de {controlAtt.typeControl == 0 && 'Medicamento'} {controlAtt.typeControl == 1 && 'Medicamento'} {controlAtt.typeControl == 2 && 'Medição'}</h2>
                        <hr />
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: 'auto' }}>
                                    <Tab label="Tipo Tratamento" {...a11yProps(0)} disabled />
                                    <Tab label="Horários" {...a11yProps(1)} disabled />
                                    <Tab label="Informações do Paciente" {...a11yProps(2)} disabled />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div className='div_form'>
                                    <label className="form-label">Selecione o tipo de tratamento</label>
                                    <select className='form-control' name='typeControl' value={med ? med : 0} onChange={(e: any) => {
                                        changeInput(e);
                                        setMed(Number(e.target.value));
                                    }}>
                                        <option selected disabled hidden value={0}>Tipo de tratamento</option>
                                        <option value={1}>Medicamento</option>
                                        <option value={2}>Medição</option>
                                    </select>
                                </div>
                                {med === 1 &&
                                    <>
                                        <div className='div_form'>
                                            <label className="form-label">Selecione ou informe medicamento</label>
                                            <input style={{ textTransform: 'capitalize' }} type="text" className='form-control' placeholder='Medicamento registrado' value={controlAtt.medicamento} name="medicamento" onChange={changeInput} required />
                                        </div>
                                        <div className='div_form'>
                                            <label className="form-label">Unidade</label>
                                            <select className='form-control' id="">
                                                <option value="">Comprimido (s)</option>
                                                <option value="">Cápsula (s)</option>
                                                <option value="">gotas (s)</option>
                                                <option value="">Injeção (ões)</option>
                                            </select>
                                        </div>
                                    </>
                                }
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-primary mt-2' disabled={!(med !== 0 && controlAtt.medicamento)} onClick={() => setValue(1)}>Próximo passo</button>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <label className="form-label">Intervalo de frequência</label>
                                <div className='div_form div_form_add_plus'>
                                    <input type="time" className='form-control' name='numberAdd' value={controlAtt.numberAdd} onChange={changeInput} />
                                    {
                                        numberdata.length !== 6 &&
                                        <span className='add_freq' onClick={insertNumberData}>
                                            Adicionar
                                            <BsPlus />
                                        </span>
                                    }
                                </div>
                                {
                                    numberdata.length === 0 ? null :
                                        <div className="viewNumbersAdd mt-4">
                                            <hr />
                                            <label className='mb-3'>Frequencias adicionadas</label>
                                            {
                                                numberdata.map((e, index) => (
                                                    <div className='div_form div_form_add_plus' key={e}>
                                                        <input type="time" className='form-control' value={e.freq} disabled />
                                                        <span className='rem_freq' onClick={removeNumberData}>
                                                            <HiMinusSm />
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                                {
                                    numberdata.length === 6 ?
                                        <div className="alertion">
                                            <span className='alert alert-warning w-100 text-center'>No máximo 6 frequências!</span>
                                        </div>
                                        : null
                                }
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-primary mt-2' disabled={!controlAtt.numberAdd} onClick={() => setValue(2)}>Próximo passo</button>
                                    <button className='btn btn-danger mt-2 mx-2' onClick={() => setValue(0)}>Voltar</button>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div className='div_form'>
                                    <label className="form-label">Informe o paciente</label>
                                    <select className='form-control' value={controlAtt.patient_id} name="patient_id" onChange={changeInput} >
                                        <option selected disabled hidden value={0}>Selecione o paciente</option>
                                        {
                                            patients.map((pat: any, index) => (
                                                <option value={pat.id} key={index}>{pat.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='div_form'>
                                    <label className="form-label">Informação sobre o controle</label>
                                    <textarea className='form-control' value={controlAtt.description} name="description" onChange={changeInput}></textarea>
                                </div>
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-success mt-2 mx-2' onClick={handleSubmit}>Criar controle</button>
                                    <button className='btn btn-danger mt-2 mx-2' onClick={() => setValue(1)}>Voltar</button>
                                </div>
                            </TabPanel>
                        </Box>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}