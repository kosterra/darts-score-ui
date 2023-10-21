import React, { Fragment, useState } from 'react';
import { 
  Card
} from 'react-bootstrap';

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    LineChart,
    Legend
} from 'recharts';

const StatsLineChart = (props) => {
    const {
      title,
      subtitle = '',
      data,
      xLabel = '',
      yLabel = '',
      players,
      labels,
      showLegend
    } = props;

    const [lineProps, setLineProps] = useState(
      labels.reduce(
        (a, { key }) => {
          a[key] = false;
          return a;
        },
        { hover: null }
      )
    );

    const handleLegendMouseEnter = (e) => {
      if (!lineProps[e.dataKey]) {
        setLineProps({ ...lineProps, hover: e.dataKey });
      }
    };

    const handleLegendMouseLeave = (e) => {
      setLineProps({ ...lineProps, hover: null });
    };

    const selectLine = (e) => {
      setLineProps({
        ...lineProps,
        [e.dataKey]: !lineProps[e.dataKey],
        hover: null
      });
    };

    const renderLegendText = (value, entry) => {
      return(
        <span className="d-flex justify-content-center align-items-center">
          <span className="fs-8 text-grey pt-1">
            <i className="fas fa-circle m-1" style={{color: lineProps[entry.dataKey] === true ? '#fff' : entry.payload.stroke }}></i>
          </span>
          <span className="fs-8 text-grey pt-1">
            {value}
          </span>
        </span>
      );
    };

    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="d-flex flex-column align-items-center bg-primary-grey">
            <span className="bg-primary-green text-white text-center fs-8 p-2 w-100">{`${payload[0].payload.desc}`}</span>
            <div className="d-flex flex-column align-items-start p-2">
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
        <Card className={`d-flex justify-content-center h-100 m-0 p-0 rounded-0 bg-secondary-grey border-0`}>
            <Card.Body className="m-0 p-0 border-0 rounded-0">
                <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                  <div className="fs-6 fw-600">{ title }</div>
                  <div className="fs-8 mt-1">{ subtitle }</div>
                </Card.Title>
                <Card.Text as="div" className="d-flex justify-content-center p-2 text-white">
                  <ResponsiveContainer width="100%" height={330}>
                    <LineChart
                      data={ data }
                      margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                      <YAxis type="number"
                        domain={[0, 180]}
                        label={{
                          value: yLabel,
                          position: "center",
                          angle: -90,
                          dx: -20
                        }}
                      />

                      {labels.map((label, index) => (
                          <Fragment key={'fragment-' + index}>
                            <XAxis dataKey={ label.xKey }
                                  dy={ 10 }
                                  tick={{fontSize: 1}}
                                  label={{
                                    value: xLabel,
                                    position: "bottom",
                                    dy: 0
                                  }}
                            />
                            <Line
                              name={players[index].nickname}
                              key={'line-' + index}
                              dataKey={label.lineKey}
                              stroke={label.stroke}
                              strokeWidth={2}
                              fill={ label.fill }
                              hide={lineProps[label.lineKey] === true}
                              strokeOpacity={
                                Number(lineProps.hover === label.lineKey || !lineProps.hover ? 0.8 : 0.2)
                              }
                              fillOpacity={
                                Number(lineProps.hover === label.lineKey || !lineProps.hover ? 0.8 : 0.2)
                              }
                              dot={{ stroke: label.stroke, strokeWidth: 2 }}
                            />
                          </Fragment>
                        ))
                      }
                      
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                      
                      { showLegend &&
                        <Legend
                          onClick={selectLine}
                          onMouseOver={handleLegendMouseEnter}
                          onMouseOut={handleLegendMouseLeave}
                          verticalAlign='bottom'
                          formatter={renderLegendText}
                          iconType='circle'
                          iconSize={0}
                        />
                      }
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Text>
            </Card.Body>
        </Card>
      </Fragment>
    );
};

export default StatsLineChart;