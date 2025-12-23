import { Fragment } from "react";

const EliminationGameHeader = ({
    targetScore,
    gameOutMode
}) => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center mb-4">
                <div className="d-flex flex-column align-items-center rounded-bottom-4 bg-shade700 p-3 px-4 text-center shadow-sm">
                    <div className="text-shade100 fs-6 fw-bold">Elimination</div>
                    <div className="text-shade400 fs-7 mt-1">
                        <span className="me-2">
                            <strong>Target Score:</strong> {targetScore}
                        </span>
                        <span className="me-2">
                            <strong>Checkout:</strong> {gameOutMode}
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EliminationGameHeader;
