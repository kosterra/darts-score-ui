import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

import logo from '/logo.svg';


const Navbar = (props) => {
    const {
        showSidebar,
        toggleSidebar
    } = props

    const handleToggleSidebar = () => {
        toggleSidebar();
    }

    const start = (
        <div className="flex align-items-center gap-2">
            {!showSidebar &&
                <Button rounded text severity="secondary" icon="pi pi-bars" onClick={handleToggleSidebar} />
            }
        </div>
    );
    const end = (
        <div className="flex align-items-center pe-4">
            <img
                alt="darts score logo"
                src={logo}
                width="60"
                height="60"
                className="d-inline-block"
            />
            <span className="ps-2 text-white fw-semibold fs-7">Darts Score</span>
        </div>
    );

    return (
        <div>
            <Menubar start={start} end={end} />
        </div>
    )
};

export default Navbar;