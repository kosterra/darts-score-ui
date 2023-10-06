import React, { Fragment } from 'react';
import { 
  Card
} from 'react-bootstrap';

import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';

const StatsScatterChart = (props) => {

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
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      
                      <XAxis type="number" dataKey="total" label={{ value: "Total Attempts", position: "bottom", dy: 0}} />
                      <YAxis type="number" dataKey="hit" label={{ value: "Hit", position: "center", angle: -90, dx: -20}} />
                      <ZAxis type="number" dataKey="rate" range={[100, 1000]} />
                      <Scatter data={data}
                               fill="#528b6e"
                               stroke="#d4c783"
                               strokeWidth={2}
                               opacity={0.5}
                               line={false}        
                      >
                        {/* <LabelList dataKey="section" position="right" offset={5} /> */}
                      </Scatter>
                      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', fill: "transparent" }} />
                    </ScatterChart>
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
        <span className="bg-primary-green text-center text-white fs-8 p-2 w-100">{`${payload[0].payload.section}`}</span>
        <div className="d-flex flex-column align-items-center p-2">
          <span className="text-white fs-8">{`${payload[0].payload.hit} / ` }{payload[0].payload.hit + payload[0].payload.miss}</span>
          <span className="text-white fs-8">{`(${payload[0].payload.rate}%)`}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsScatterChart;