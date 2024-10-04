import '../index.css';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import React from 'react';
import { useSendGetChartDataRequestQuery } from '../redux/reducers/apiReducer';

const Chart = () => {
  const ref = useRef(null);
  const { data: dataset2 } = useSendGetChartDataRequestQuery();

  useEffect(() => {
    if (!dataset2 || dataset2.length === 0) return;

    // Remove existing SVG if any
    d3.select(ref.current).select('svg').remove();

    const draw = (dataset) => {
      // Create a new array with parsed month values
      const parsedDataset = dataset.map(d => ({
        ...d,
        month: new Date(d.month),
      }));

      let svg = d3.select(ref.current)
        .append('svg')
        .attr('width', 1150)
        .attr('height', 320)
        .append('g')
        .attr("transform", `translate(60,35)`);

      let x = d3.scaleTime()
        .domain(d3.extent(parsedDataset, d => d.month))
        .range([0, 1030]);

      let y = d3.scaleLinear()
        .domain([0, d3.max(parsedDataset, d => d.value)])
        .range([250, 0]);

      svg.append('g')
        .attr('transform', `translate(0,250)`)
        .call(d3.axisBottom(x).tickPadding(10).ticks(parsedDataset.length)
          .tickFormat(d3.timeFormat("%b %Y")))
        .call(g => g.select(".domain").remove())
        .selectAll(".tick line")
        .style("stroke-opacity", .5);

      svg.selectAll(".tick text")
        .attr("fill", "#777")
        .style("font-weight", 700);

      svg.append('g')
        .call(d3.axisLeft(y).ticks(d3.max(parsedDataset, d => d.value) / 5))
        .call(g => g.select(".domain").remove())
        .selectAll(".tick line")
        .style("stroke-opacity", 0.5);

      svg.selectAll(".tick text")
        .attr("fill", "#777")
        .style("font-weight", 1000);

      svg.selectAll("xGrid")
        .data(x.ticks().slice(0))
        .join("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", 250)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5);

      svg.selectAll("yGrid")
        .data(y.ticks(d3.max(parsedDataset, d => d.value)))
        .join("line")
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("x1", 0)
        .attr("x2", 1030)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5);

      let line = d3.line()
        .x(d => x(d.month))
        .y(d => y(d.value));

      svg.append("path")
        .datum(parsedDataset)
        .attr("fill", 'none')
        .attr('stroke', '#7A91FF')
        .attr('stroke-width', 3)
        .attr('d', line);

      svg.append("text")
        .attr("transform", 'rotate(90)')
        .attr('x', -160)
        .attr('y', -60)
        .attr("font-size", "16px")
        .style("font-family", "body")
        .style("font-weight", 500)
        .style("fill", "grey")
        .text("Collaboration Number");

      svg.append("text")
        .attr('x', 575)
        .attr('y', 290)
        .attr("font-size", "14px")
        .style("font-family", "body")
        .text("Date");

      const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

      let circle = svg.append("circle")
        .attr('r', 5)
        .attr("fill", "#7A91FF")
        .attr("stroke", "white")
        .attr("opacity", .75);

      const listeningRect = svg.append("rect")
        .attr("opacity", 0)
        .attr("width", 1030)
        .attr("height", 250);

      listeningRect.on("mousemove", function (event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.month).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(parsedDataset, x0, 1);
        const d0 = parsedDataset[i - 1];
        const d1 = parsedDataset[i];
        const d = x0 - d0.month > d1.month - x0 ? d1 : d0;
        const xPos = x(d.month);
        const yPos = y(d.value);

        circle.transition().duration(40).attr("cx", xPos)
          .attr("cy", yPos);

        d3.select('.tooltip')
          .style('display', 'block')
          .style('left', `${xPos + 50}px`)
          .style('top', `${yPos - 50}px`)
          .html(`<strong>Date:</strong> ${d.month.toLocaleDateString()}<br><strong>Value:</strong> ${d.value !== undefined ? d.value : 'N/A'}`);
      });

      listeningRect.on("mouseleave", function () {
        circle.transition()
          .duration(50)
          .attr("r", 0);
        d3.select('.tooltip').style("display", "none");
      });
    };

    draw(dataset2);
  }, [dataset2]);

  return (
    <div ref={ref} className='relative flex items-center justify-center'>
      <div className="tooltip"></div>
    </div>
  );
};

export default Chart;
