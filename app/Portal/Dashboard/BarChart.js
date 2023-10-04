"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  useEffect(() => {
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
   var svg = d3.select("#lab5-bar")
               .append("svg")
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

  return <svg id="lab5-bar"></svg>;
};

export default BarChart;
