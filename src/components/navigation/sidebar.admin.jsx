import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import {
    FaUserPen
} from "react-icons/fa6";

import { GiDart } from "react-icons/gi";

const SidebarAdmin = (props) => {
    const { collapsed } = props;

    return (
        <Fragment>
            {collapsed &&
                <hr className="menu-divider my-1" />
            }
            {!collapsed &&
                <div className="menu-subtitle fw-semibold fs-8 ps-4 py-2 pt-4">
                    Admin
                </div>
            }
            <Menu>
                <MenuItem icon={<FaUserPen className="fs-6" />} component={<Link to="/admin/players" />} className="fs-8 fw-semibold">
                    Players
                </MenuItem>
                <SubMenu
                    label="Games"
                    icon={<GiDart className="fs-6" />}
                    className="fs-8 fw-semibold"
                >
                    <MenuItem component={<Link to="/admin/games/x01" />} className="fs-8 fw-semibold"> X01</MenuItem>
                    <MenuItem component={<Link to="/admin/games/cricket" />} className="fs-8 fw-semibold"> Cricket</MenuItem>
                </SubMenu>
            </Menu>
        </Fragment>
    );
};

export default SidebarAdmin;