import React from "react";

function CircularSVG({ data1, data2 }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke="green" strokeWidth="6" fill="transparent" />
      <text x="50" y={data2 === '' ? '55':'50'} textAnchor="middle" fill="#440099">{data1}</text>
      <text x="50" y="70" textAnchor="middle" fill="#440099">{data2}</text>
    </svg>
  );
}

export default CircularSVG;
