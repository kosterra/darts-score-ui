import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem
} from 'react-pro-sidebar';

import {
    MdSportsCricket
} from "react-icons/md";

import {
    FaBullseye
} from "react-icons/fa6";

const SidebarPlay = (props) => {
    const { collapsed } = props;

    return (
        <Fragment>
            {collapsed &&
                <hr className="text-gray-600 my-1" />
            }
            {!collapsed &&
                <div className="text-gray-600 fw-semibold fs-8 ps-4 py-2 pt-4">
                    Let's Play Darts
                </div>
            }
            <Menu>
                <MenuItem icon={<FaBullseye />} component={<Link to="/x01" />} className="fs-8 fw-semibold">
                    X01
                </MenuItem>
                <MenuItem icon={<MdSportsCricket />} component={<Link to="/cricket" />} className="fs-8 fw-semibold">
                    Cricket
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default SidebarPlay;