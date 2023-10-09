import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import {
    FaChartLine,
    FaTrophy
} from "react-icons/fa6";

const SidebarStats = (props) => {
    const { collapsed } = props;

  return (
    <Fragment>
        { collapsed &&
            <hr className="text-primary-grey my-1" />
        }
        { !collapsed &&
            <div className="text-primary-grey fw-600 fs-8 ps-4 py-2">
                Statistics
            </div>
        }
        <Menu>
            <MenuItem icon={<FaChartLine />} component={<Link to="/stats/players" />} className="fs-8 fw-500">
                Players
            </MenuItem>
            <SubMenu
                label="Games"
                icon={<FaTrophy />}
                className="fs-8 fw-500"
            >
                <MenuItem component={<Link to="/stats/games/x01" />} className="fs-8 fw-500"> X01</MenuItem>
                <MenuItem component={<Link to="/stats/games/cricket" />} className="fs-8 fw-500"> Cricket</MenuItem>
            </SubMenu>
        </Menu>
    </Fragment>
  );
};

export default SidebarStats;