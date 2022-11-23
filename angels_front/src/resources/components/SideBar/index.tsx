import React, { useContext } from 'react'
import { Dock } from 'react-dock';

import './sidebar.css';
import NavItems from '../Nav/navItems';

export default function SideBar() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('openSide', () => { setOpen(true) })
    })

    return (
        <Dock
            isVisible={open}
            onVisibleChange={visible => {
                setOpen(visible)
            }}
            position="left"
            fluid={true}
            size={0.7}
        >
            <div className='sidebar_box'>
                <NavItems />
            </div>
        </Dock>
    )
}
