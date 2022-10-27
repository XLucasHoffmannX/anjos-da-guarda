import * as React from 'react';
import { Tab, Box, Typography, Tabs } from '@material-ui/core';
import Wrapper from '../../components/layout/Wrapper';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';

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
    const [controlAtt, setControlAtt] = React.useState({
        typeControl: 0,
    });

    const [med, setMed] = React.useState<number>(0);

    const changeInput = (e: React.SyntheticEvent) => changeInputRecursive(e, controlAtt, setControlAtt);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Wrapper title='Criar Controle' welcome={false}>
            <div className='control_box'>
                <div className='form_control_angels'>
                    <form action="">
                        <h2 className='form_section mt-2'>Controle de Medicamento</h2>
                        <hr />
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: 'auto' }}>
                                    <Tab label="Tipo Tratamento" {...a11yProps(0)} />
                                    <Tab label="Horários" {...a11yProps(1)} />
                                    <Tab label="Informações do Paciente" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div className='div_form'>
                                    <label className="form-label">Selecione o tipo de tratamento</label>
                                    <select className='form-control' name='typeControl' onChange={(e: any) => {
                                        changeInput(e);
                                        setMed(Number(e.target.value));
                                    }}>
                                        <option selected disabled hidden>Tipo de tratamento</option>
                                        <option value={1}>Medicamento</option>
                                        <option value={2}>Medição</option>
                                    </select>
                                </div>
                                {med === 1 &&
                                    <>
                                        <div className='div_form'>
                                            <label className="form-label">Selecione ou informe medicamento</label>
                                            <input type="text" className='form-control' placeholder='Medicamento registrado' required />
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
                                            <select className='form-control' id="">
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                            </select>
                                        </div>
                                    </>
                                }
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-primary mt-2' onClick={() => setValue(1)}>Próximo passo</button>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className='div_form d-flex flex-row-reverse'>
                                    <button className='btn btn-primary mt-2' onClick={() => setValue(2)}>Próximo passo</button>
                                    <button className='btn btn-danger mt-2 mx-2' onClick={() => setValue(0)}>Voltar</button>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div className='div_form d-flex flex-row-reverse'>
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