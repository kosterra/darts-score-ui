import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem
} from 'react-pro-sidebar';

import {
    MdDashboard
} from "react-icons/md";

const SidebarDashboard = (props) => {
    const { collapsed } = props;

    return (
        <Fragment>
            {collapsed &&
                <hr className="menu-divider my-1" />
            }
            <Menu>
                <MenuItem icon={<MdDashboard className="fs-6" />} component={<Link to="/" />} className="fs-8 fw-semibold">
                    Dashboard
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default SidebarDashboard;