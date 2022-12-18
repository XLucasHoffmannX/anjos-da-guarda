
import { useState } from 'react'

export default function ModalsApi() {

    const [modals, setModals] = useState({
        open: false,
        message: '-',
        success: true,
        title: '',
        link: ''
    });


    return {
        modals: [modals, setModals]
    }
}
