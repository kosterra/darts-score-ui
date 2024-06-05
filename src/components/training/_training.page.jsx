import { useParams } from "react-router-dom";

import ATC from './atc';

const TrainingPage = () => {

    const { id } = useParams();

    function TrainingContent() {
        switch (id) {
            case 'atc':
                return (
                    <ATC />
                );
            default:
                return (
                    <ATC />
                );
        }
    }

    return (
        <div className="container-fluid p-4 bg-transparent border-0">
            <div className="row justify-content-md-center align-items-center">
                <TrainingContent />
            </div>
        </div>
    )
}

export default TrainingPage;
