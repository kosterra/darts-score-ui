import React from 'react';
import { useParams } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Container, Row } from 'react-bootstrap';
import AdminSidebar from '../components/navigation/admin.sidebar';
import PlayersEditList from '../components/elements/players.edit.list';
import X01EditList from '../components/elements/x01.edit.list';

const AdminPage = () => {

    const { id } = useParams();

    function AdminContent() {
        switch (id) {
            case 'players':
                return <PlayersEditList emptyText="No Players found. Please create new players first!"/>;
            case 'x01':
                return <X01EditList emptyText="No X01 Games found. Please play any games first!"/>;
            case 'cricket':
                return <span>Cricket Games</span>;
            default:
                return <span>Players</span>;
        }
    }

    return (
        <div className="d-flex">
            <ProSidebarProvider>
                <AdminSidebar />
                <Container fluid className="bg-transparent border-0 m-4">
                    <Row className="justify-content-md-center align-items-center">
                        <AdminContent />
                    </Row>
                </Container>
            </ProSidebarProvider>
        </div>
    );
};

export default AdminPage;