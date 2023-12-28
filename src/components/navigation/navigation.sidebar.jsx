import React, { useState } from 'react';
import {
    Sidebar
} from 'react-pro-sidebar';

import {
    Button,
    Col,
    Row
} from 'react-bootstrap';

import {
    MdClose 
} from "react-icons/md";

import {
    FaBars
} from "react-icons/fa6";

import SidebarHeader from './sidebar.header';
import SidebarPlay from './sidebar.play';
import SidebarAdmin from './sidebar.admin';
import SidebarStats from './sidebar.stats';
// import SidebarTraining from './sidebar.training';
import SidebarMisc from './sidebar.misc';
import SidebarDashboard from './sidebar.dashboard';


const NavigationSidebar = () => {
    const [ collapsed, setCollapsed ] = useState(true);

	return (
		<div className="sidebar min-vh-100">
            <Sidebar
                breakPoint="md"
                collapsed={collapsed}
            >
                <div className="h-100 bg-secondary-grey">
                    <Row className="d-flex">
                        <Col className={`${collapsed ? 'col-12' : 'col-9'} p-0 ps-2 pt-2`}>
                            <SidebarHeader />
                        </Col>
                        <Col className={`${collapsed ? 'col-12' : 'col-3'} p-0 pt-2 pe-1 d-flex align-items-center justify-content-center`}>
                            <Button
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                }}
                            >
                                { collapsed &&
                                    <FaBars />
                                }
                                { !collapsed &&
                                    <MdClose />
                                }
                            </Button>
                        </Col>
                    </Row>
                    <SidebarDashboard collapsed={ collapsed } />
                    <SidebarPlay collapsed={ collapsed } />
                    {/* <SidebarTraining collapsed={ collapsed } /> */}
                    <SidebarStats collapsed={ collapsed } />
                    <SidebarAdmin collapsed={ collapsed } />
                    <SidebarMisc />
                </div>
            </Sidebar>
		</div>
	);
};

export default NavigationSidebar;