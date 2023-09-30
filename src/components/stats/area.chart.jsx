import React, { Fragment } from 'react';
import { 
  Card
} from 'react-bootstrap';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const StatsAreaChart = (props) => {

    const {
      title,
      subtitle,
      data
    } = props

    return (
      <Fragment>
        <Card className={`d-flex justify-content-center h-100 m-0 p-0 rounded-0 bg-tertiary-grey border-0`}>
            <Card.Body className="m-0 p-0 border-0 rounded-0 bg-tertiary">
                <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                  <div className="fs-6 fw-600">{ title }</div>
                  <div className="fs-8 mt-1">{ subtitle }</div>
                </Card.Title>
                <Card.Text as="div" className="d-flex justify-content-center p-2 text-white">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={ data }
                      margin={{
                        top: 30,
                        right: 60,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                      <XAxis dataKey='label' dy={10} />
                      <YAxis type="number" domain={[0, 180]} dx={-10} tickCount={10} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                      <Area type="monotone"
                            dataKey='value'
                            stroke="#d4c783"
                            strokeWidth={2}
                            fill="#528b6e"
                            dot={{ stroke: '#d4c783', strokeWidth: 2 }}
                      />
                    </AreaChart>
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
        <p className="bg-primary-green text-white fs-8 p-2">{`${payload[0].payload.desc}`}</p>
        <div>
          <p className="text-white fs-8">{`${payload[0].payload.value}`}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsAreaChart;