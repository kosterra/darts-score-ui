import { Fragment } from 'react';

import {
    Col,
    Row
} from 'react-bootstrap';

import X01StatsComparisonBars from './x01.stats.comparison.bars';

const X01StatsTab = (props) => {
    const {
        valueKey,
        game
    } = props;

    return (
        <Fragment>
            <Row>
                <Col>
                    <X01StatsComparisonBars game={ game } valueKey={ valueKey } />
                </Col>
            </Row>
        </Fragment>
    );
};

export default X01StatsTab;