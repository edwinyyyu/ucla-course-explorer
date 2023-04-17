import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// https://reactfordataviz.com/articles/force-directed-graphs-with-react-and-d3v7/
const ForceGraph = ({ nodes, links }) => {
  const validLinks = links.filter(l =>
    nodes.filter(n => n.id === l.source).length > 0 &&
    nodes.filter(n => n.id === l.target).length > 0
  );

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const drag_start = d => {
      if (!d.active) simulation.alphaTarget(0.3).restart();
      d.subject.fx = d.subject.x;
      d.subject.fy = d.subject.y;
    };

    const drag = d => {
      d.subject.fx = d.x;
      d.subject.fy = d.y;
    };

    const drag_end = d => {
      if (!d.active) simulation.alphaTarget(0);
      d.subject.fx = null;
      d.subject.fy = null;
    };

    const link = svg.append('g')
      .selectAll('line')
      .data(validLinks)
      .join('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('r', 4)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('fill', 'green')
        .call(d3.drag()
          .on("start", drag_start)
          .on("drag", drag)
          .on("end", drag_end)
        );

    const simulation = d3.forceSimulation(nodes)
      .force('center', d3.forceCenter(800, 600))
      .force('x', d3.forceX(800))
      .force('y', d3.forceY(600))
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(validLinks).id(d => d.id))
      .alphaTarget(0.1)
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
  }, [nodes, validLinks]);

  return (
    <svg ref={svgRef} width='1600' height='1200' ></svg>
  );
};

export default ForceGraph;
