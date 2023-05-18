import React from 'react';
import {
    ProSidebarProvider,
    Sidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import { BsFillPeopleFill } from "react-icons/bs";
import { GiDart } from "react-icons/gi";
import { Link } from 'react-router-dom';


const AdminSidebar = () => {

	return (
		<div className="sidebar min-vh-100">
            <ProSidebarProvider>
                <Sidebar breakPoint="lg" >
                    <div className="h-100 bg-tertiary-grey">
                        <Menu>
                            <MenuItem icon={<BsFillPeopleFill />} component={<Link to="/admin/players" />} className="fs-7 fw-600">
                                Players
                            </MenuItem>
                            <SubMenu
                                label="Games"
                                icon={<GiDart />}
                                className="fs-7 fw-600"
                            >
                                <MenuItem component={<Link to="/admin/games/x01" />} className="fs-8 fw-500"> X01</MenuItem>
                                <MenuItem component={<Link to="/admin/games/cricket" />} className="fs-8 fw-500"> Cricket</MenuItem>
                            </SubMenu>
                        </Menu>
                    </div>
                </Sidebar>
            </ProSidebarProvider>
		</div>
	);
};

export default AdminSidebar;