import React from 'react';
import { useParams } from "react-router-dom";
import PlayersList from './players.list';
import X01EditList from './x01.edit.list';
import CricketEditList from './cricket.edit.list';

const AdminPage = () => {

    const { id } = useParams();

    function AdminContent() {
        switch (id) {
            case 'players':
                return <PlayersList deleteActive={true} rawActive={true} emptyText="No Players found. Please create new players first!" />;
            case 'x01':
                return <X01EditList deleteActive={true} rawActive={true} emptyText="No X01 Games found. Please play any games first!" />;
            case 'cricket':
                return <CricketEditList deleteActive={true} rawActive={true} emptyText="No Cricket Games found. Please play any games first!" />;
            default:
                return <PlayersEditList deleteActive={true} rawActive={true} emptyText="No Players found. Please create new players first!" />;
        }
    }

    return (
        <div className="container-fluid p-4 border-0">
            <AdminContent />
        </div>
    );
};

export default AdminPage;