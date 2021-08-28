import * as React from 'react';
import LineChart from '@mui/charts/LineChart';
import Line from '@mui/charts/Line';
import XAxis from '@mui/charts/XAxis';
import YAxis from '@mui/charts/YAxis';
import Grid from '@mui/charts/Grid';

const lineData1 = [
  { x: new Date(2015, 0, 1), y: 4 },
  { x: new Date(2016, 0, 1), y: 14 },
  { x: new Date(2017, 0, 1), y: 36 },
  { x: new Date(2018, 0, 1), y: 38 },
  { x: new Date(2019, 0, 1), y: 54 },
  { x: new Date(2020, 0, 1), y: 47 },
  { x: new Date(2021, 0, 1), y: 70 },
];

export default function BasicLineChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart data={lineData1} xScaleType="time" fill="white">
        <Grid />
        <Line stroke="rgb(235,97,97)" markerShape="none" />
        <XAxis />
        <YAxis suffix="kg" />
      </LineChart>
    </div>
  );
}
