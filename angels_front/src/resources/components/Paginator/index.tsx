import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    page: number,
    setPage: any,
    lastPage: number
}

export default function Paginator({ page, setPage, lastPage }: Props) {
    const next = () => {
        if (page === lastPage) return;
        setPage(page + 1);
    }

    const prev = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    return (
        <nav className='pagination mt-3 mb-5'>
            {
                lastPage === 1 ? null :
                    <>
                        <li className='page-item'>
                            <Link to="#" className='page-link' onClick={prev}>Página Anterior</Link>
                        </li>
                        <li className='page-item'>
                            <Link to="#" className='page-link' onClick={next}>Próxima página</Link>
                        </li>
                    </>
            }

        </nav>
    )
}
