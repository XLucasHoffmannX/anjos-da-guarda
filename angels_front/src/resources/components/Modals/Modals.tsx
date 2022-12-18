import React, { useContext } from 'react'
import { Modal, Box, Typography } from '@material-ui/core';
import SuccessAnimate from '../../assets/lottie/success.json';
import WarningAnimate from '../../assets/lottie/alert-warning.json';

import './modals.css';
import { ContextState } from '../../../context/DataProvider';
import Lottie from 'react-lottie';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(90%, 400px)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Modals() {
    const state: any = useContext(ContextState);
    const setModal = state.modalsGeral.modals[1];

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: state.modalsGeral.modals[0].success ? SuccessAnimate : WarningAnimate,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const handleClose = () => {
        state.modalsGeral.modals[0].open ?
            setModal({
                open: false,
                message: '-',
                title: '',
                success: true,
                link: ''
            }) :
            setModal({
                open: true,
                message: '-',
                title: '',
                success: true,
                link: ''
            })
    }

    return (
        <Modal
            open={state.modalsGeral.modals[0].open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='modals'>
                    {
                        state.modalsGeral.modals[0].title ?
                            <div>
                                <h2>{state.modalsGeral.modals[0].title}</h2>
                                <hr />
                            </div>
                            : null
                    }
                    <div className='modals_animate'>
                        <Lottie
                            options={defaultOptions}
                        />
                    </div>
                    <div className='modals_message mt-4'>
                        <span>
                            {state.modalsGeral.modals[0].message}
                        </span>
                    </div>
                    <div className='modals_button'>
                        <a
                            style={state.modalsGeral.modals[0].success ? { background: 'var(--green)' } : { background: 'var(--red)' }}
                            href={state.modalsGeral.modals[0].link ? `${state.modalsGeral.modals[0].link}` : "#"}
                            onClick={handleClose}
                        >
                            Ok
                        </a>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}