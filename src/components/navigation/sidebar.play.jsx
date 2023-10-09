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
        { collapsed &&
            <hr className="text-primary-grey my-1" />
        }
        { !collapsed &&
            <div className="text-primary-grey fw-600 fs-8 ps-4 py-2">
                Let's Play Darts
            </div>
        }
        <Menu>
            <MenuItem icon={<FaBullseye />} component={<Link to="/x01" />} className="fs-8 fw-500">
                X01
            </MenuItem>
            <MenuItem icon={<MdSportsCricket />} component={<Link to="/cricket" />} className="fs-8 fw-500">
                Cricket
            </MenuItem>
        </Menu>
    </Fragment>
  );
};

export default SidebarPlay;