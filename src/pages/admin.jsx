import React from 'react';
import { useParams } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Container, Row } from 'react-bootstrap';
import AdminSidebar from '../components/navigation/admin.sidebar';

const AdminPage = () => {

    const { id } = useParams();

    function AdminContent() {
        switch (id) {
            case 'players': 
                return <span>Players</span>;
            case 'x01':
                return <span>X01 Games</span>;
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