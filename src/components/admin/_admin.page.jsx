import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
import PlayersEditList from './players.edit.list';
import X01EditList from './x01.edit.list';
import CricketEditList from './cricket.edit.list';

const AdminPage = () => {

    const { id } = useParams();

    function AdminContent() {
        switch (id) {
            case 'players':
                return <PlayersEditList deleteActive={true} rawActive={true} emptyText="No Players found. Please create new players first!" />;
            case 'x01':
                return <X01EditList deleteActive={true} rawActive={true} emptyText="No X01 Games found. Please play any games first!" />;
            case 'cricket':
                return <CricketEditList deleteActive={true} rawActive={true} emptyText="No Cricket Games found. Please play any games first!" />;
            default:
                return <PlayersEditList deleteActive={true} rawActive={true} emptyText="No Players found. Please create new players first!" />;
        }
    }

    return (
        <Container fluid className="p-4 bg-transparent border-0">
            <Row className="justify-content-md-center align-items-center">
                <AdminContent />
            </Row>
        </Container>
    );
};

export default AdminPage;