import React from 'react';
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates';

const ResponsiveParallelCoordinatesChart = ({ data, parameters }) => {
  const variablesConfig = parameters.map(param => ({
    id: param,
    label: param,
    value: param,
    min: 'auto',
    max: 'auto',
    ticksPosition: 'after',
    legendPosition: 'start',
    legendOffset: 20
  }));

  return (
    <div style={{ height: 400 }}>
      <ResponsiveParallelCoordinates
        data={data}
        variables={variablesConfig}
        margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
        colors={{ scheme: 'nivo' }}
        lineOpacity={0.75}
        lineWidth={3}
        axesPlan="foreground"
        axesTicksPosition="before"
        motionConfig="molasses"
        legends={[
          {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      />
    </div>
  );
};

export default ResponsiveParallelCoordinatesChart;
