import React, { Fragment, useState } from 'react';
import {
  Card
} from 'react-bootstrap';

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const StatsBarChart = (props) => {
  const {
    title,
    subtitle = '',
    xLabel = '',
    yLabel = '',
    data,
    players,
    labels,
    showLegend = false
  } = props;

  const [barProps, setBarProps] = useState(
    labels.reduce(
      (a, { barKey }) => {
        a[barKey] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = () => {
    setBarProps({ ...barProps, hover: null });
  };

  const selectBars = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null
    });
  };

  const renderLegendText = (value, entry) => {
    return (
      <span className="d-flex justify-content-center align-items-center">
        <span className="fs-8 text-gray pt-1">
          <i className="fas fa-circle m-1" style={{ color: barProps[entry.dataKey] === true ? '#fff' : entry.payload.fill }}></i>
        </span>
        <span className="fs-8 text-gray pt-1">
          {value}
        </span>
      </span>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="d-flex flex-column align-items-center bg-tertiary">
          <span className="bg-primary text-center text-white fs-8 p-2 w-100">{`${payload[0].payload.range}`}</span>
          <div className="d-flex flex-column align-items-center p-2">
            {payload.map((payload, index) => (
              <span key={index} className="text-white fs-8">{`${players.length > 1 ? payload.name + ': ' : ''}${payload.value}`}</span>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Fragment>
      <Card className={`d-flex justify-content-center h-100 m-0 p-0 rounded-0 bg-secondary border-0`}>
        <Card.Body className="m-0 p-0 border-0 rounded-0">
          <Card.Title as="h6" className="bg-primary p-2 mb-0 text-white text-center span">
            <div className="fs-6 fw-semibold">{title}</div>
            <div className="fs-8 mt-1">{subtitle}</div>
          </Card.Title>
          <Card.Text as="div" className="d-flex justify-content-center p-2 text-white">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 0,
              }}
                data={data}
              >
                <YAxis label={{ value: yLabel, position: "center", angle: -90, dx: -20 }} />

                {labels.map((label, index) => (
                  <Fragment key={'fragment-' + index}>
                    <XAxis type="category"
                      dataKey={label.xKey}
                      interval={0}
                      tick={{
                        fontSize: 1,
                        dx: -4,
                        textAnchor: "end"
                      }}
                      label={{
                        value: xLabel,
                        position: "bottom"
                      }}
                      padding={{ top: 20 }}
                      angle={-70}
                    />
                    <Bar key={'bar-' + index}
                      name={players[index].nickname}
                      dataKey={label.barKey}
                      fill={label.fill}
                      hide={barProps[label.barKey] === true}
                      fillOpacity={
                        Number(barProps.hover === label.barKey || !barProps.hover ? 0.8 : 0.2)
                      }
                    />
                  </Fragment>
                ))}

                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', fill: "transparent" }} />

                {showLegend &&
                  <Legend
                    onClick={selectBars}
                    onMouseOver={handleLegendMouseEnter}
                    onMouseOut={handleLegendMouseLeave}
                    verticalAlign='bottom'
                    formatter={renderLegendText}
                    iconType='circle'
                    iconSize={0}
                  />
                }
              </BarChart>
            </ResponsiveContainer>
          </Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default StatsBarChart;