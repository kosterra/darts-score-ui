import React, { Fragment } from 'react';
import { 
  Card
} from 'react-bootstrap';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const StatsBarChart = (props) => {

    const {
      title,
      subtitle,
      data
    } = props;

    return (
      <Fragment>
        <Card className={`d-flex justify-content-center h-100 m-0 p-0 rounded-0 bg-tertiary-grey border-0`}>
            <Card.Body className="m-0 p-0 border-0 rounded-0 bg-tertiary">
                <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                  <div className="fs-6 fw-600">{ title }</div>
                  <div className="fs-8 mt-1">{ subtitle }</div>
                </Card.Title>
                <Card.Text as="div" className="d-flex justify-content-center p-2 text-white">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', fill: "transparent" }} />
                      <Bar dataKey="count" fill="#528b6e" opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Text>
            </Card.Body>
        </Card>
      </Fragment>
    );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="d-flex flex-column align-items-center bg-primary-grey">
        <span className="bg-primary-green text-center text-white fs-8 p-2 w-100">{`${payload[0].payload.range}`}</span>
        <div className="d-flex flex-column align-items-center p-2">
          <span className="text-white fs-8">{`${payload[0].payload.count}`}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsBarChart;