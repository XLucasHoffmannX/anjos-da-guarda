import React from 'react'
import { Link } from 'react-router-dom'
import { HttpAuth } from '../../../app/api/Http';

interface Props {
    id: number,
    titleMessage: string,
    endpoint: string,
    cb: any
}

export default function Delete({ id, titleMessage, endpoint, cb }: Props) {
    const remove = async () => {
        if (window.confirm(`Tem certezar de remover : ${titleMessage} ?`)) {
            await HttpAuth.delete(`/${endpoint}/${id}`);

            cb(true);
        }
    }

    return (
        <Link to="#" className='btn btn-sm btn-outline-danger ms-2' onClick={() => remove()}>Remover</Link>
    )
}
