import * as React from 'react';
import { Tab, Box, Typography, Tabs } from '@material-ui/core';
import Wrapper from '../../components/layout/Wrapper';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import { HttpAuth } from '../../../app/api/Http';
import { ContextState } from '../../../context/DataProvider';

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
    const [userData] = state.userApi.userInfo;

    const [controlAtt, setControlAtt] = React.useState<any>({
        typeControl: 0,
        frequency: 0,
        patient_id: 0,
        medicamento: '',
        description: ''
    });

    const [control, setControl] = React.useState();
    const [med, setMed] = React.useState<number>(0);
    const [freq, setFreq] = React.useState<any[]>([]);
    const [patients, setPatients] = React.useState<any[]>([]);
    const [freqDefinitive, setFreqDefinitive] = React.useState<any[]>([]);
    const [dataFinalizado, setDataFinalizado] = React.useState(false);
    const [controlCreated, setControlCreated] = React.useState('');
    const [freqField, setFreqField] = React.useState<any>({
        value: ''
    });

    const changeInput = (e: React.SyntheticEvent) => changeInputRecursive(e, controlAtt, setControlAtt);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    React.useEffect(() => {

        const getAllPatients = async () => {
            const res = await HttpAuth.get(`/patient-all`);

            setPatients(res.data);
        };

        getAllPatients();

        const getControl = async (controlCreated: any) => {
            HttpAuth.get(`/control/${controlCreated}`).then((res)=>{
                setControl(res.data);
            });

        };

        if(dataFinalizado){
            if(controlCreated){
                getControl(controlCreated);
            }
        }

    }, [freq, freqDefinitive, freqField, dataFinalizado, controlCreated]);

    const changeFreq = (e: any) => {
        const { name, value } = e.target;
        console.log(freq.length, freqField.name)

        setFreqField({ ...state, name, value });

        if (name !== freqField.name && freqField.value !== '') {
            setFreqDefinitive([...freqDefinitive, { value: freqField.value }]);
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const param = {
            user_created: userData.id,
            patient_id: controlAtt.patient_id,
            medicamento: controlAtt.medicamento,
            description: controlAtt.description
        }

        if (param.medicamento && param.patient_id) {

            if (freqDefinitive.length > 0 || freqField.value) {
                HttpAuth.post('/control', { ...param }).then(async (res) => {
                    if (res.data) {
                        if (freqField.value && freqDefinitive.length < 0) {
                            HttpAuth.post('/frequency',
                                { control_id: res.data.id, time: freqField.value }
                            );
                        } else {
                            for (let f of freqDefinitive) {
                                console.log('data => ', f);
                                HttpAuth.post('/frequency',
                                    { control_id: res.data.id, time: f.value }
                                );
                            }
                            HttpAuth.post('/frequency',
                                { control_id: res.data.id, time: freqField.value }
                            );
                        }
                        setDataFinalizado(true);
                        setControlCreated(res.data.id);
                    }
                });
            } else {
                alert('Informar os horários das frequências');
            }
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
                                        <div className='div_form'>
                                            <label className="form-label">Frequêcia por dia</label>
                                            <select className='form-control' name='frequency' value={controlAtt.frequency ? controlAtt.frequency : 0} onChange={(e: any) => {
                                                changeInput(e);
                                                setFreq([]);
                                                for (let i = 1; i <= e.target.value; i++) {
                                                    setFreq(prev => [...prev, {
                                                        index: i,
                                                        value: '',
                                                    }])
                                                }
                                            }}>
                                                <option selected disabled hidden value={0}>Quantidade de vezes no dia</option>
                                                <option value={Number(1)}>1</option>
                                                <option value={Number(2)}>2</option>
                                                <option value={Number(3)}>3</option>
                                                <option value={Number(4)}>4</option>
                                                <option value={Number(5)}>5</option>
                                            </select>
                                        </div>
                                    </>
                                }
                                <div className='div_form d-flex flex-row-reverse'>
                                    {
                                        med !== 0 && freq.length > 0 ?
                                            <button className='btn btn-primary mt-2' onClick={() => setValue(1)}>Próximo passo</button>
                                            :
                                            <button className='btn btn-primary mt-2' disabled onClick={() => setValue(1)}>Próximo passo</button>
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {
                                    freq.map((time, index) => (
                                        <div className='div_form' key={index}>
                                            <label className="form-label">Informe a frequência:</label>
                                            <input
                                                type="time" className='form-control' required
                                                name={`${index}`}
                                                onChange={changeFreq}
                                            />
                                        </div>
                                    ))
                                }
                                <div className='div_form d-flex flex-row-reverse'>
                                    {
                                        <button className='btn btn-primary mt-2' onClick={() => setValue(2)}>Próximo passo</button>
                                    }
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
                                    <label className="form-label">Descrição sobre o controle:</label>
                                    <textarea className='form-control' value={controlAtt.description} name="description" onChange={changeInput}></textarea>
                                </div>
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-success mt-2 mx-2' onClick={handleSubmit}>Criar controle</button>
                                    {
                                        freqDefinitive.length > 0 || freqField.value !== '' ?
                                            <button className='btn btn-danger mt-2 mx-2' onClick={() => document.location.href = '/create-control'}>Recriar controle</button>
                                            :
                                            <button className='btn btn-danger mt-2 mx-2' onClick={() => setValue(1)}>Voltar</button>
                                    }
                                </div>
                            </TabPanel>
                        </Box>
                        {
                            control ? control : null
                        }
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}