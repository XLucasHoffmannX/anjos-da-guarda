import React, { useContext } from 'react';
import { Alert } from '@material-ui/lab';
import { Modal } from '@material-ui/core';
import './geralNotify.css';
import { ContextState } from '../../../context/DataProvider';

export default function Notify() {
    const state: any = useContext(ContextState);
    const [notify, setNotify] = state.notifyGeral.notify;

    return (
        <>
            <Modal
                hideBackdrop={true}
                open={notify.open}
                className="d-flex flex-column align-items-center justify-content-center h-100"
            >
                <div className='geral_notify_container'>
                    <div className='geral_notify_control m-3'>
                        <Alert severity={notify.success ? 'success' : 'error'} onClose={() => setNotify({ ...notify, open: false })}>{notify.message}</Alert>
                    </div>
                </div>
            </Modal>
        </>
    )
}
