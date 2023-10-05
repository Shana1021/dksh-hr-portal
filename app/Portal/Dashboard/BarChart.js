"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const observer = new ResizeObserver(entries =>
      entries.forEach(entry =>
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      )
    );

    observer.observe(ref.current);
    return observer.disconnect;
  }, [ref]);

  return dimensions;
};

export default function BarChart() {
  /*useEffect(() => {
    // Define the dimensions and size for the SVG
    var w = 600;
    var h = 200;

    var dataset =[24,8,9,15,21,7,4,13,21,13,25];

    //Ordinal scale method
    var xScale = d3.scaleBand() 
      //calculating the range of the domain
      .domain(d3.range(dataset.length))
      //specify the size of range the domain needs to be mapped too.
      .rangeRound([0,w])
      //generate a padding value of 5% of the bandwidth
      .paddingInner(0.05)

    var yScale = d3.scaleLinear()
      .domain([0,d3.max(dataset)])
      .range([0,h]);

    //SVG element
    var svg = d3.select("#barChart")
      .attr("width",w)
      .attr("height",h);

    //rectangles
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d) {
        return h - yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return yScale(d);
      })
      .attr("fill", "maroon")
      .on("mouseover", function (event,d) { 
        var xPosition = parseFloat(d3.select(this).attr("fill","orange").attr("x")) + xScale.bandwidth()/3;
        var yPosition = parseFloat(d3.select(this).attr("fill","orange").attr("y")) + 14;

        //append the text into position
        svg.append("text")
          .attr("id","tooltip")
          .attr("x",xPosition)
          .attr("y",yPosition)
          .text(d)
          .attr("fill","black");
      })
      .on("mouseout", function () {
        //remove tool tip
        d3.select("#tooltip").remove();
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "maroon");
      });

  }, []);
  
  return <svg id="barChart"></svg>;*/

  const svgRef = useRef(null);
  const { width: svgWidth, height: svgHeight } = useDimensions(svgRef);
  const [hoverIndex, setHoverIndex] = useState(null);

  const dataset =[24,8,9,15,21,7,4,13,21,13,25];

  const xScale = d3.scaleBand(d3.range(dataset.length), [0, svgWidth]).padding(0.05);
  const yScale = d3.scaleLinear([0, d3.max(dataset)], [0, svgHeight]);

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <g fill="maroon">
        {dataset.map((d, i) => (
          <rect
            key={i}
            fill={hoverIndex === i ? "orange" : null}
            x={xScale(i)} y={svgHeight - yScale(d)}
            width={xScale.bandwidth()} height={yScale(d)}
            style={{ transition: "fill 0.2s" }}
            onMouseOver={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          />
        ))}
      </g>
      {hoverIndex !== null && <text
        fill="black" x={xScale(hoverIndex) + xScale.bandwidth() / 2} y={svgHeight - yScale(dataset[hoverIndex]) / 2}
        dominantBaseline="middle" textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >{dataset[hoverIndex]}</text>}
    </svg>
  );
}
