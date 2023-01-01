import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// https://reactfordataviz.com/articles/force-directed-graphs-with-react-and-d3v7/
const ForceGraph = ({ nodes, links }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('r', 5)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', 'green');

    const simulation = d3.forceSimulation(nodes)
      .force('center', d3.forceCenter(400, 300))
      .force('charge', d3.forceManyBody().strength(40))
      .force('collision', d3.forceCollide(20))
      .force('link', d3.forceLink(links))
      .on('tick', () => {
        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
      });
  }, []);

  return (
    <svg ref={svgRef} width='800' height='600' ></svg>
  );
};

export default ForceGraph;
