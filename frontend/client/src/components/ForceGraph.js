import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceGraph = ({ nodes, links }) => {
  const validLinks = links.filter(l =>
    nodes.filter(n => n.id === l.source).length > 0 &&
    nodes.filter(n => n.id === l.target).length > 0
  );

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const simulation = d3.forceSimulation(nodes)
      .force('center', d3.forceCenter(800, 600))
      .force('x', d3.forceX(800))
      .force('y', d3.forceY(600))
      .force('charge', d3.forceManyBody()
        .strength(Math.min(-100 + Math.sqrt(nodes.length), -10))
      )
      .force('link', d3.forceLink(validLinks)
        .id(d => d.id)
        .strength(1 / Math.log(validLinks.length))
      )
      .alphaTarget(0.3)
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

    const link = svg.append('g')
      .selectAll('line')
      .data(validLinks)
      .join('line')
        .attr('stroke', '#115533')
        .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('r', 6)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', '#22aa66')
        .call(drag(simulation))
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

    node.append('title')
      .text(d => d.id);

  }, [nodes, validLinks]);

  return (
    <div className='ForceGraph'>
      <svg ref={svgRef} width='1600' height='1200' ></svg>
    </div>
  );
};

const drag = simulation => {
  const drag_start = d => {
    if (!d.active) simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.subject.x;
    d.subject.fy = d.subject.y;
  };

  const dragged = d => {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  };

  const drag_end = d => {
    if (!d.active) simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  };

  return d3.drag()
    .on('start', drag_start)
    .on('drag', dragged)
    .on('end', drag_end);
};

const mouseover = (e, d) => {
  d3.select(e.target)
    .transition()
    .attr('r', 9)
    .attr('fill', '#33ff99');
};

const mouseout = (e, d) => {
  d3.select(e.target)
    .transition()
    .attr('r', 6)
    .attr('fill', '#22aa66');
}

export default ForceGraph;
