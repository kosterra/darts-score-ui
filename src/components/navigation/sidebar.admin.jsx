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
        { collapsed &&
            <hr className="text-primary-grey my-1" />
        }
        { !collapsed &&
            <div className="text-primary-grey fw-600 fs-8 ps-4 py-2">
                Admin
            </div>
        }
        <Menu>
            <MenuItem icon={<FaUserPen />} component={<Link to="/admin/players" />} className="fs-8 fw-500">
                Players
            </MenuItem>
            <SubMenu
                label="Games"
                icon={<GiDart />}
                className="fs-8 fw-500"
            >
                <MenuItem component={<Link to="/admin/games/x01" />} className="fs-8 fw-500"> X01</MenuItem>
                <MenuItem component={<Link to="/admin/games/cricket" />} className="fs-8 fw-500"> Cricket</MenuItem>
            </SubMenu>
        </Menu>
    </Fragment>
  );
};

export default SidebarAdmin;