import { useState } from 'react'

export default function NotifyApi() {
    const [notify, setNotify] = useState({
        open: false,
        message: '-',
        success: true
    });

    if(notify.open){
        setTimeout(()=>{
            setNotify({...notify, open: false})
        }, 8000)
    }

    return {
        notify: [notify, setNotify]
    }
}
