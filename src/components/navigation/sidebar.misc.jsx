import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem
} from 'react-pro-sidebar';

import {
    FaCircleQuestion,
    FaGear
} from "react-icons/fa6";

const SidebarMisc = () => {

    return (
        <Fragment>
            <hr className="text-shade600 my-1" />
            <Menu>
                <MenuItem icon={<FaGear />} component={<Link to="/" />} className="fs-8 fw-semibold">
                    Settings
                </MenuItem>
                <MenuItem icon={<FaCircleQuestion />} component={<Link to="/about" />} className="fs-8 fw-semibold">
                    About
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default SidebarMisc;