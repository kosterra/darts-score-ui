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
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="sidebar min-vh-100">
            <Sidebar
                breakPoint="md"
                collapsed={collapsed}
            >
                <div className="h-100 bg-secondary">
                    <div className="row pt-2 pb-3">
                        <div className={`${collapsed ? 'col-12' : 'col-9'} p-0`}>
                            <SidebarHeader collapsed={collapsed} />
                        </div>
                        <div className={`${collapsed ? 'col-12 justify-content-center pt-2' : 'col-3'} p-0 d-flex align-items-center`}>
                            <Button
                                variant="tertiary"
                                className=""
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                }}
                            >
                                {collapsed &&
                                    <FaBars />
                                }
                                {!collapsed &&
                                    <MdClose />
                                }
                            </Button>
                        </div>
                    </div>
                    <SidebarDashboard collapsed={collapsed} />
                    <SidebarPlay collapsed={collapsed} />
                    {/* <SidebarTraining collapsed={ collapsed } /> */}
                    <SidebarStats collapsed={collapsed} />
                    <SidebarAdmin collapsed={collapsed} />
                    <SidebarMisc />
                </div>
            </Sidebar>
        </div>
    );
};

export default NavigationSidebar;