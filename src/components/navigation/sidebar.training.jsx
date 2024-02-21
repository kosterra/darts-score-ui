import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem
} from 'react-pro-sidebar';

import {
    BsClockHistory
} from "react-icons/bs";

const SidebarTraining = (props) => {
    const { collapsed } = props;

    return (
        <Fragment>
            {collapsed &&
                <hr className="menu-divider my-1" />
            }
            {!collapsed &&
                <div className="menu-subtitle fw-semibold fs-8 ps-4 pt-2">
                    Training
                </div>
            }
            <Menu>
                <MenuItem icon={<BsClockHistory className="fs-6" />} component={<Link to="/x01" />} className="fs-8 fw-semibold">
                    Around the clock
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default SidebarTraining;