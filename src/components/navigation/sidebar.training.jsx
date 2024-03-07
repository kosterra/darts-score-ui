import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BsClockHistory } from "react-icons/bs";
import { Menu, MenuItem } from 'react-pro-sidebar';


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