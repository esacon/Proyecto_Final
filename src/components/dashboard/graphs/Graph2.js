import React from "react";
import Plot from "react-plotly.js";

export default function Graph2({ collapsed, x, y, titley, title, linecolor }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Plot
        divId="plotlyChart"
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "lines",
            line: { color: linecolor },
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 45, l: 45, r: 45, b: 45 },
          xaxis: {
            showgrid: true,
            title: "tiempo (s)",
          },
          yaxis: {
            title: titley,
          },
          title: {
            text: title,
          },
          titlefont: {
            family: "Roboto Condensed",
            size: 18,
            color: "black",
          },
        }}
        //config={{ responsive: true, displayModeBar: false }}
        className="ploty-graphs"
        style={{ width: "100%", height: "100%", display: "flex" }}
      />
    </div>
  );
}
