import React, { Fragment } from 'react';
import { 
  Card
} from 'react-bootstrap';

import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    Tooltip,
    PolarRadiusAxis
} from 'recharts';

const StatsRadarChart = (props) => {

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
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={130} data={data} >
                      <PolarGrid gridType="circle" />
                      <PolarAngleAxis dataKey="section" />
                      <PolarRadiusAxis scale='auto' axisLine={false} tick={false} domain={['0', 'auto']} />
                      <Radar dataKey="hit"
                             stroke="#d4c783"
                             strokeWidth={2}
                             fill="#528b6e"
                             fillOpacity={0.5}
                             dot={{ stroke: '#d4c783', strokeWidth: 2 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                    </RadarChart>
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
        <span className="bg-primary-green text-center text-white fs-8 p-2 w-100">Total: {`${payload[0].payload.hit}`}</span>
        <div className="d-flex flex-column align-items-center p-2">
          <span className="text-white fs-8">Single: {`${payload[0].payload.S}`}</span>
          <span className="text-white fs-8">Double: {`${payload[0].payload.D}`}</span>
          <span className="text-white fs-8">Triple: {`${payload[0].payload.T}`}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsRadarChart;