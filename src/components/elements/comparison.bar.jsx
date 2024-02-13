import React, { Fragment } from 'react';

import {
  Col,
  Row
} from 'react-bootstrap';

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

import ChartConfigOptions from '../stats/chart.config.options';

const ComparisonBar = (props) => {
  const {
    data
  } = props;

  const { fillColors } = ChartConfigOptions;

  const valueAccessor = attribute => ({ payload }) => {
    return (payload[attribute] <= 0 ? '' :
      payload[attribute]
      + (data[0].unit ? data[0].unit : '')
      + ' '
      + (payload[attribute + 'sub'] ? payload[attribute + 'sub'] : ''));
  };

  return (
    <Fragment>
      {Object.values(data[0]).filter((value) => !isNaN(value) && value > 0).length > 0 &&
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <span className="fs-8 fw-semibold text-gray">{data[0].name}</span>
          </Col>
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <ResponsiveContainer width="100%" height={45}>
              <BarChart
                width={500}
                data={data}
                layout="vertical"
                stackOffset="expand"
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 14,
                }}
                title={data[0].name}
              >
                <XAxis type="number" hide={true} />
                <YAxis type="category" hide={true} dataKey="name" />

                {data[0].player1 &&
                  <Bar key={Math.random()} dataKey="player1" stackId="a" fill={fillColors.values[0]} animationDuration={2000}>
                    <LabelList className="fs-8 fw-semibold" position="inside" fill="#fff" valueAccessor={valueAccessor("player1")} />
                  </Bar>
                }
                {data[0].player2 &&
                  <Bar key={Math.random()} dataKey="player2" stackId="a" fill={fillColors.values[1]} animationDuration={2000}>
                    <LabelList className="fs-8 fw-semibold" position="inside" fill="#fff" valueAccessor={valueAccessor("player2")} />
                  </Bar>
                }
                {data[0].player3 &&
                  <Bar key={Math.random()} dataKey="player3" stackId="a" fill={fillColors.values[2]} animationDuration={2000}>
                    <LabelList className="fs-8 fw-semibold" position="inside" fill="#fff" valueAccessor={valueAccessor("player3")} />
                  </Bar>
                }
                {data[0].player4 &&
                  <Bar key={Math.random()} dataKey="player4" stackId="a" fill={fillColors.values[3]} animationDuration={2000}>
                    <LabelList className="fs-8 fw-semibold" position="inside" fill="#fff" valueAccessor={valueAccessor("player4")} />
                  </Bar>
                }
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      }
    </Fragment>
  );
}

export default ComparisonBar;