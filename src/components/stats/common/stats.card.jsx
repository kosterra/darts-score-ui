import React from 'react';
import {
    Card
} from 'react-bootstrap';

const StatsCard = (props) => {
    const {
        title,
        subtitle,
        value,
        subvalue
    } = props


    return (
        <Card className="rounded-0 border-0 bg-secondary w-100">
            <Card.Body className="m-0 p-0 border-0 rounded-0">
                <Card.Title className="bg-primary p-2 mb-0 text-white text-center span">
                    <div className="fs-6 fw-semibold">{title}</div>
                    <div className="fs-8 mt-1">{subtitle}</div>
                </Card.Title>
                <Card.Text as="div" className="p-2 text-white text-center fs-1">
                    <div className="d-flex flex-column align-items-center p-1 pt-3">
                        <span className="text-white fs-1">
                            {value}
                        </span>
                        <span className="text-shade700 text-center fs-7">
                            {subvalue}
                        </span>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default StatsCard;  